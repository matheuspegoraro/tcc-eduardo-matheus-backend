const connection = require('../../database');
const httpStatus = require('http-status');  
const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
  async financialData(req, res) {
    const { type } = req.params;
    
    try {
      connection.query(`
        SELECT COALESCE((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "movementTypeId" = ${type} and 
          "done" is true and 
          date_part('year', "dischargeDate"::timestamp) = ${moment().year()} and
          date_part('month', "dischargeDate"::timestamp) = num 
          group by date_part('month', "dischargeDate"::timestamp)), 0) val
        FROM (VALUES (1, 'Janeiro'), (2, 'Fevereiro'), (3, 'Março'), (4, 'Abril'), (5, 'Maio'), (6, 'Junho'), (7, 'Julho'), (8, 'Agosto'), (9, 'Setembro'), (10, 'Outubro'), (11, 'Novembro'), (12, 'Dezembro')) AS months (num, descr);
      `).spread(function(results, metadata) {

        const result = results.map(obj => {
          return obj.val;
        });

        return res.status(httpStatus.OK).json(result);
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async currentLiquidity(req, res) {
    const currentDate = moment();
    const previousDate = moment().add('months', -1);

    const sCurrentDate = currentDate.endOf('month').format('YYYY-MM-DD');
    const sPreviousDate = previousDate.endOf('month').format('YYYY-MM-DD');

    try {
      connection.query(`
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "dischargeDate" <= '${sCurrentDate}' and
          "done" is true and 
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "dischargeDate" <= '${sCurrentDate}' and
          "done" is true and 
          "movementTypeId" = 1
        ), 0)) currentliquidity
        UNION ALL
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "dischargeDate" <= '${sPreviousDate}' and
          "done" is true and 
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "dischargeDate" <= '${sPreviousDate}' and
          "done" is true and 
          "movementTypeId" = 1
        ), 0)) currentliquidity;
      `).spread(function(results, metadata) {
        const previousMonth = results[1].currentliquidity;
        const currentMonth = results[0].currentliquidity;

        return res.status(httpStatus.OK).json({
          'percentcurrentliquidity': (previousMonth/currentMonth*100),
          'currentliquidity': currentMonth
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async projectedLiquidity(req, res) {

    const currentDate = moment();
    const previousDate = moment().add('months', -1);

    const sCurrentDate = currentDate.endOf('month').format('YYYY-MM-DD');
    const sPreviousDate = previousDate.endOf('month').format('YYYY-MM-DD');

    try {
      connection.query(`
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "date" <= '${sCurrentDate}' and
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "date" <= '${sCurrentDate}' and
          "movementTypeId" = 1
        ), 0)) projectedliquidity
        UNION ALL
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "date" <= '${sPreviousDate}' and
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          "companyId" = ${req.companyId} and 
          "date" <= '${sPreviousDate}' and
          "movementTypeId" = 1
        ), 0)) projectedliquidity;
      `).spread(function(results, metadata) {

        const previousMonth = results[1].projectedliquidity;
        const currentMonth = results[0].projectedliquidity;

        return res.status(httpStatus.OK).json({
          'percentprojectedliquidity': (previousMonth/currentMonth*100),
          'projectedliquidity': currentMonth
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async higherCategorySpending(req, res) {
    try {
      connection.query(`
        select m."categoryId", c."name", c.color, SUM(m.value) as total
        from movements m
        inner join categories c on (m."categoryId" = c.id)
        where
        m."companyId" = ${req.companyId} and 
        m."movementTypeId" = 1 and
        m."done" = true and 
        m."dischargeDate" is not null
        group by m."categoryId", c.name, c.color 
        order by total desc
        limit 5;
      `).spread(function(results, metadata) {
        return res.status(httpStatus.OK).json({
          'higherCategorySpending': results
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};