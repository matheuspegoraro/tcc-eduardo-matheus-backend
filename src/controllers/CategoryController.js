const Category = require('../models/Category');
const httpStatus = require('http-status');

const listToTree = (list) => {
  let map = {}, node, roots = [], i;

  for (i = 0; i < list.length; i++) {
      map[list[i].id] = i;
      list[i].dataValues.children = []; 
  }

  for (i = 0; i < list.length; i++) {
      node = list[i].dataValues;

      if (node.parentId !== null) {
        list[map[node.parentId]].dataValues.children.push(node);
      } else {
        roots.push(node);
      }
  }
  
  return roots;
}

module.exports = {
  async list(req, res) {
    const { companyId } = req;

    try {
      let categories = await Category.findAll({
        attributes: ['id', 'name', 'parentId', 'color', 'createdAt', 'updatedAt'],
        where: { companyId },
        order: [
          ['id', 'ASC'],
        ],
      });

      categories = listToTree(categories);

      return res.status(httpStatus.OK).json(categories);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar a lista de categorias! Por favor, tente mais tarde.' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { parentId, name, color } = req.body;

    try {
      const category = await Category.create({ companyId, parentId, name, color });

      return res.status(httpStatus.OK).json(category);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar cadastrar categoria! Por favor, tente mais tarde.' });
    }
  },

  async byId(req, res) {
    const { categoryId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar categoria! Categoria não existente na base de dados.' });

      return res.json(category);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar categoria! Por favor, tente mais tarde.' });
    }
  }, 

  async edit(req, res) {
    const { companyId: companyId } = req;
    const { categoryId } = req.params;
    const { parentId, name, color } = req.body;

    try {
      const category = await Category.findByPk(categoryId);

      if (category) {
        category.update({
          parentId, name, color
        })
        .then(() => {
          res.status(httpStatus.OK).json(category);
        })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar a categoria! Categoria não existente na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar a categoria! Por favor, tente mais tarde.' });
    }
  },

  async delete(req, res) {
    const { categoryId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);

      if (category) {
        category.destroy()
          .then(() => {
            res.status(httpStatus.OK).json(category);
          })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover a categoria! Categoria não existente na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover a categoria! Por favor, tente mais tarde.' });
    }
  },
};