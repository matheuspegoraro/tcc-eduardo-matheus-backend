const connection = require('../../database');
const httpStatus = require('http-status');  
const moment = require('moment');

module.exports = {
  async financialData(req, res) {
    const { type } = req.params;
    
    try {
      connection.query(`
        SELECT COALESCE((
          select SUM(value) val
          from movements 
          where
          "movementTypeId" = ${type} and 
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
  async monthlyIncrease(req, res) {
    const tempDate = moment();
    
    const month = tempDate.month();
    const year = tempDate.year();

    const previousMonth = tempDate.month(tempDate.month() - 1).month();
    const previousYear = tempDate.month(tempDate.month() - 1).year();

    try {
      connection.query(`
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          date_part('month', "dischargeDate"::timestamp) = ${month} and
          date_part('year', "dischargeDate"::timestamp) = ${year}  and
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          date_part('month', "dischargeDate"::timestamp) = ${month} and
          date_part('year', "dischargeDate"::timestamp) = ${year}  and
          "movementTypeId" = 1
        ), 0)) balancesheet
        UNION
        select (coalesce((
          select SUM(value) val
          from movements 
          where
          date_part('month', "dischargeDate"::timestamp) = ${previousMonth} and
          date_part('year', "dischargeDate"::timestamp) = ${previousYear}  and
          "movementTypeId" = 2
        ), 0) - coalesce((
          select SUM(value) val
          from movements 
          where
          date_part('month', "dischargeDate"::timestamp) = ${previousMonth} and
          date_part('year', "dischargeDate"::timestamp) = ${previousYear}  and
          "movementTypeId" = 1
        ), 0)) balancesheet;
      `).spread(function(results, metadata) {

        const previousMonth = results[1].balancesheet;
        const currentMonth = results[0].balancesheet;

        return res.status(httpStatus.OK).json({
          'percentbalancesheet': (currentMonth/previousMonth*100),
          'balancesheet': (currentMonth + previousMonth)
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};