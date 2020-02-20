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
        where: { companyId }
      });

      categories = listToTree(categories);

      return res.status(httpStatus.OK).json(categories);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { parentId, name, color } = req.body;

    try {
      const categoryFind = await Category.findOne({ where: { name } });

      if (categoryFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Category already exists!' });

      const category = await Category.create({ companyId, parentId, name, color });

      return res.status(httpStatus.OK).json(category);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async byId(req, res) {
    const { categoryId } = req.params;

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Category not found!' });

      return res.json(category);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};