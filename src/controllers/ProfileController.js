const httpStatus = require("http-status");

const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
  async profileById(req, res) {
    const { userId } = req;

    try {
      const user = await User.findOne({
        attributes: [
          "id",
          "name",
          "email",
          "type",
          "createdAt",
        ],
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["id", "name"],
          },
        ],
        where: {
          id: userId
        }
      });

      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: "Usuário não encontrado!" });

      return res.json(user);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Ocorreu um problema na requisição!" });
    }
  },

  async update(req, res) {

    const { userId } = req;
    const { name } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: "Usuário não encontrado!" });

      await user.update({
        name
      });

      return res.status(httpStatus.OK).send();
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Ocorreu um problema na requisição!" });
    }
  }
};
