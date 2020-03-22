const Movement = require("../models/Movement");
const Company = require("../models/Company");
const Bill = require("../models/Bill");
const MovementType = require("../models/MovementType");
const Category = require("../models/Category");
const httpStatus = require("http-status");

//MOVEMENTS TYPES:
//1 - PAGAMENTOS;
//2 - RECEBIMENTOS;
//3 - TRANSFERÊNCIAS;

const EXPENSES = 1;

module.exports = {
  async list(req, res) {
    const { companyId } = req;

    try {
      const movements = await Movement.findAll({
        attributes: [
          "id",
          "name",
          "value",
          "date",
          "done",
          "dischargeDate",
          "createdAt",
          "updatedAt"
        ],
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["id", "name"]
          },
          {
            model: Bill,
            as: "bill",
            attributes: ["id", "name", "currentValue"]
          },
          {
            model: MovementType,
            as: "movementType",
            attributes: ["id", "name"]
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "color"]
          }
        ],
        where: {
          companyId,
          movementTypeId: EXPENSES
        },
        order: [["date", "DESC"]]
      });

      return res.status(httpStatus.OK).json(movements);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Problema ao listar contas! Por favor, tente mais tarde."
      });
    }
  },

  async create(req, res) {
    const { companyId } = req;
    const {
      billId,
      movementTypeId,
      categoryId,
      name,
      value,
      date,
      done,
      dischargeDate
    } = req.body;

    try {
      if (done) {
        if (!dischargeDate)
          return res.status(httpStatus.BAD_REQUEST).json({
            error: "Data do pagamento é obrigatório!"
          });

        Bill.decrement({ currentValue: value }, { where: { id: billId } });
      }

      const movement = await Movement.create({
        companyId,
        billId,
        movementTypeId,
        categoryId,
        name,
        value,
        date,
        done,
        dischargeDate
      });

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Problemas ao criar conta! Por favor, tente mais tarde."
      });
    }
  },

  async update(req, res) {
    const { companyId } = req;
    const { movementId } = req.params;
    const {
      billId,
      movementTypeId,
      categoryId,
      name,
      value,
      date,
      done
    } = req.body;

    try {
      const movement = await Movement.findByPk(movementId);

      if (!movement)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Não encontramos o movimento informado!" });

      if (movement.done)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Não é permitido editar pagamentos já realizados!" });

      movement.update({
        companyId,
        billId,
        movementTypeId,
        categoryId,
        name,
        value,
        date,
        done
      });

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Problemas ao atualizar conta! Por favor, tente mais tarde."
      });
    }
  },

  async byId(req, res) {
    const { movementId } = req.params;
    const { companyId } = req;

    try {
      const movement = await Movement.findOne({
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["id", "name"]
          },
          {
            model: Bill,
            as: "bill",
            attributes: ["id", "name", "currentValue"]
          },
          {
            model: MovementType,
            as: "movementType",
            attributes: ["id", "name", "icon"]
          },
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "color"]
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
          .json({ error: "Não encontramos o movimento informado!" });

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

      if (movement.done) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Não é permitido deletar pagamentos já realizados!" });
      }

      await movement.destroy();
      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível deletar o movimento!" });
    }
  },

  async makePayment(req, res) {
    const { companyId } = req;
    const { movementId, dischargeDate, value } = req.body;
    let diferenceOfValue;

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
          .json({ error: "Não encontramos o movimento infomado!" });

      if (movement.value < value)
        return res.status(httpStatus.BAD_REQUEST).json({
          error: "O valor pago deve ser menor ou igual ao valor do movimento!"
        });

      if (movement.value != value) {
        diferenceOfValue = movement.value - value;

        movement.update({
          dischargeDate,
          value,
          done: true
        });

        Movement.create({
          companyId,
          billId: movement.billId,
          movementTypeId: movement.movementTypeId,
          categoryId: movement.categoryId,
          name: movement.name + " [ACERTO DE DIFERENÇA]",
          value: diferenceOfValue,
          date: movement.date
        });
      } else {
        movement.update({
          dischargeDate,
          done: true
        });
      }

      Bill.decrement(
        { currentValue: value },
        { where: { id: movement.billId } }
      );

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error:
          "Encontramos problemas ao realizar a baixa! Por favor, tente mais tarde."
      });
    }
  },

  async undoPayment(req, res) {
    const { companyId } = req;
    const { movementId } = req.params;

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

      movement.update({
        dischargeDate: null,
        done: false
      });

      Bill.increment(
        { currentValue: movement.value },
        { where: { id: movement.billId } }
      );

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error:
          "Encontramos problemas ao desfazer o movimento! Por favor, tente mais tarde."
      });
    }
  }
};
