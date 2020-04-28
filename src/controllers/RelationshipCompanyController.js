const Company = require('../models/Company');
const RelationshipCompany = require('../models/RelationshipCompany');
const httpStatus = require('http-status');  

module.exports = {
  // Pegará todos as consultorias que estão relacionadas ao cliente
  async byClientId(req, res) {
    const { clientId } = req.params;

    try {
      const advisories = await RelationshipCompany.findAll({
        include: [{
          model: Company,
          as: 'advisories',
          attributes: ['id', 'name', 'type']
        }],
        where: {
          clientId
        }
      });

      return res.status(httpStatus.OK).json(advisories);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao requisitar relacionamento de clientes!' });
    }
  }, 

  async create(req, res) {
    const { clientId, advisoryId } = req.body;

    try {
      const relationshipFind = await RelationshipCompany.findOne({ where: { clientId, advisoryId } });

      if (relationshipFind){
        return res.status(httpStatus.BAD_REQUEST).json({ error: `Relacionamento entre o cliente ${clientId} e a consuloria ${advisoryId} já existe` });
      }

      const relationship = await RelationshipCompany.create({ clientId, advisoryId });

      return res.status(httpStatus.OK).json(relationship);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async delete(req, res) {
    const { relationshipId } = req.params;

    try {
      const relationship = await RelationshipCompany.findByPk(relationshipId);

      if (relationship) {
        relationship.destroy()
          .then(() => {
            res.status(httpStatus.OK).json(relationship);
          })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover a relação entre Cliente e Consultoria! Categoria não existente na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover a relação entre Cliente e Consultoria! Por favor, tente mais tarde.' });
    }
  },
};