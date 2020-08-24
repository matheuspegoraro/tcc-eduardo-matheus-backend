const Movement = require("../models/Movement");
const Company = require("../models/Company");
const Bill = require("../models/Bill");
const MovementType = require("../models/MovementType");
const Category = require("../models/Category");
const httpStatus = require("http-status");

const moment = require('moment');

module.exports = {
  async list(req, res) {

    let idFinal;

    const { companyId } = req;
    const { month, year } = req.query;

    console.log(month, year)

    if (month === 0 || year === 0) {
      return res.status(httpStatus.OK).json([]);
    } 
    const { clientCompanyId} = req.params;

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
          "done",
          "dischargeDate",
          "movementTypeId",
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
          companyId: idFinal,
          date: {
            $gte: moment(`${month}-01-${year}`, 'MM-DD-YYYY').toDate(),
            $lt: moment(`${month}-01-${year}`, 'MM-DD-YYYY').endOf('month')
          }
        },
        order: [["date", "DESC"]]
      });

      return res.status(httpStatus.OK).json(movements);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Problema ao listar o fluxo de caixa! Por favor, tente mais tarde."
      });
    }
  },

};
