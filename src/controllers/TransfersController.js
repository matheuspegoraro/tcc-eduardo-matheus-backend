const Movement = require("../models/Movement");
const Bill = require("../models/Bill");
const Category = require("../models/Category");
const httpStatus = require("http-status");

const moment = require('moment');

//MOVEMENTS TYPES:
//1 - PAGAMENTOS;
//2 - RECEBIMENTOS;
//3 - TRANSFERÊNCIAS;

const TRANSFERS = 3;

module.exports = {
  async list(req, res) {

    let idFinal;

    const { companyId } = req;
    const { month, year } = req.query;

    if (parseInt(month) === 0 || parseInt(year) === 0) {
      return res.status(httpStatus.OK).json([]);
    } 

    const { clientCompanyId } = req.params;

    idFinal = companyId;

    if (clientCompanyId) {
      idFinal = clientCompanyId;
    }

    try {
      const movements = await Movement.findAll({
        attributes: [
          "id",
          "name",
          "value",
          "date",
          "dischargeDate",
          "createdAt"
        ],
        include: [
          {
            model: Bill,
            as: "bill",
            attributes: ["name"]
          },
          {
            model: Bill,
            as: "billOut",
            attributes: ["name"]
          },
          {
            model: Category,
            as: "category",
            attributes: ["name"]
          }
        ],
        where: {
          companyId: idFinal,
          movementTypeId: TRANSFERS,
          date: {
            $gte: moment(`${month}-01-${year}`, 'MM-DD-YYYY').toDate(),
            $lt: moment(`${month}-01-${year}`, 'MM-DD-YYYY').endOf('month')
          }
        },
        order: [["date", "DESC"]]
      });

      return res.status(httpStatus.OK).json(movements);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({
        error:
          "Problema ao listar as transferências! Por favor, tente mais tarde."
      });
    }
  },

  async create(req, res) {
    const { companyId } = req;
    const {
      name,
      value,
      date,
      billId,
      billOutId,
      categoryId,
      dischargeDate
    } = req.body;

    try {
      if (billId == billOutId)
        return res.status(httpStatus.BAD_REQUEST).json({
          error:
            "As contas de movimento não devem ser iguais."
        });

      const movement = await Movement.create({
        name,
        value,
        date,
        done: true,
        dischargeDate,
        billId,
        billOutId,
        movementTypeId: TRANSFERS,
        categoryId,
        companyId
      });

      if (movement){
        Bill.increment({ currentValue: value }, { where: { id: billId } });
        Bill.decrement({ currentValue: value }, { where: { id: billOutId } });
      }

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Problemas ao criar a transferência! Por favor, tente mais tarde."
      });
    }
  },

  async byId(req, res) {
    const { movementId } = req.params;
    const { companyId } = req;

    try {
      const movement = await Movement.findOne({
        attributes: [
          "id",
          "name",
          "value",
          "date",
          "dischargeDate",
          "createdAt"
        ],
        include: [
          {
            model: Bill,
            as: "bill",
            attributes: ["name"]
          },
          {
            model: Bill,
            as: "billOut",
            attributes: ["name"]
          },
          {
            model: Category,
            as: "category",
            attributes: ["name"]
          }
        ],
        where: {
          id: movementId,
          companyId
        }
      });

      if (!movement)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Não encontramos a transferência informada!" });

      return res.json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Ocorreu um erro na requisição! Por favor, tente mais tarde."
      });
    }
  },

  async delete(req, res) {
    const { movementId } = req.params;
    const { companyId } = req;

    try {
      const movement = await Movement.findOne({
        where: {
          id: movementId,
          companyId
        }
      });

      if (!movement)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Não encontramos as informações do movimento!" });

          Bill.decrement({ currentValue: movement.value }, { where: { id: movement.billId } });
          Bill.increment({ currentValue: movement.value }, { where: { id: movement.billOutId } });

      await movement.destroy();
      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível deletar o movimento!" });
    }
  }
};
