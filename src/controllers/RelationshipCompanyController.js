const Company = require('../models/Company');
const RelationshipCompany = require('../models/RelationshipCompany');
const httpStatus = require('http-status');  

module.exports = {
  async create(req, res) {
    const { advisoryId, selectedClients } = req.body;

    const relationships = [];

    try {
      const destroiedRelationships = RelationshipCompany.destroy({
        where: { 'advisoryId': advisoryId }
      });

      selectedClients.map(async clientId => {        
        const relationshipFind = await RelationshipCompany.findOne({ where: { clientId, advisoryId } });

        if (relationshipFind){
          return res.status(httpStatus.BAD_REQUEST).json({ error: `Relacionamento entre o cliente ${clientId} e a consuloria ${advisoryId}` });
        }

        relationships.push(await RelationshipCompany.create({ clientId, advisoryId }));
      });

      return res.status(httpStatus.OK).json(relationships);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async byId(req, res) {
    const { advisoryId } = req.params;

    try {
      const clients = await RelationshipCompany.findAll({
        attributes: ['clientId'],
        include: [{
          model: Company,
          as: 'clients',
          attributes: ['id', 'name', 'type']
        }, {
          model: Company,
          as: 'advisories',
          attributes: ['id', 'name', 'type']
        }],
        where: {
          advisoryId
        }
      });

      return res.status(httpStatus.OK).json(clients);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao requisitar relacionamento de clientes!' });
    }
  }, 
};