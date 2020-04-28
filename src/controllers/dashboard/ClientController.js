const connection = require('../../database');
const httpStatus = require('http-status');  

module.exports = {
  async financialData(req, res) {
    const { type, year } = req.params;
    
    try {
      connection.query(`
        SELECT COALESCE((
          select SUM(value) val
          from movements 
          where
          "movementTypeId" = ${type} and 
          date_part('year', "dischargeDate"::timestamp) = ${year} and
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
};