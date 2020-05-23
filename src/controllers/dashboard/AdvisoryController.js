const connection = require('../../database');
const httpStatus = require('http-status');  
const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
  async financialData(req, res) {
    const { type } = req.params;
    
    try {
      let clients = [];
      let clientsData = [];

      await connection.query(`
        select *
        from "relationshipCompanies" rc 
        inner join "companies" c on (c."id" = rc."clientId")
        where
        rc."advisoryId" = ${req.companyId};
      `).spread(function(results, metadata) {
        results.map(obj => {
          clients.push(obj);
        });
      });
      
      for (let index = 0; index < clients.length; index++) {
        let client = clients[index];

        clientsData.push(await connection.query(`
          SELECT COALESCE((
            select SUM(value) val
            from movements 
            where
            "companyId" = ${client.clientId} and 
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

          return {
            client: client,
            data: result
          };
        }));
      }

      console.log(clientsData);

      return res.status(httpStatus.OK).json(clientsData);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};