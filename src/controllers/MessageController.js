const Company = require('../models/Company');
const Message = require('../models/Message');
const httpStatus = require('http-status');  

const { Op } = require("sequelize");

module.exports = {
  
  //Retorna o historico de mensagens
  async history(req, res) {
    
    const { receiveId, senderId } = req.query;

    try {
      const messages = await Message.findAll({
        attributes: [
          'id',
          'receiveId',
          'senderId',
          'message',
          'createdAt'
        ],
        where: {
          [Op.and]: [ 
            {
              [Op.or]: [
                {
                  receiveId
                },
                {
                  receiveId: senderId
                },
              ]
            },
            {
              [Op.or]: [
                {
                  senderId: receiveId
                },
                {
                  senderId
                },
              ]
            }
          ]
        }
      });

      return res.status(httpStatus.OK).json(messages);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao requisitar mensagens!' });
    }
  }, 

  async create(req, res) {
    const { message, receiveId, senderId } = req.body;

    try {
      const newMessage = await Message.create({ message, receiveId, senderId });

      return res.status(httpStatus.OK).json(newMessage);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao criar mensagem!' });
    }
  }, 
};