const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      // const mappedCategories = categories.map((item) => ({
      //   name: item.name,
      // }));

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create(req.body);

      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
  static async ediCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const editedCategory = await Category.update(
        { name },
        {
          returning: true,
          where: { id },
        }
      );
      if (!editedCategory[0]) {
        throw { name: "NOT_FOUND" };
      }
      res.json(editedCategory[1]);
    } catch (err) {
      next(err);
    }
  }
  static async removeCategoryById(req, res, next) {
    try {
      const { id } = req.params;

      const selectedCategory = await Category.destroy({ where: { id } });
      // console.log(selectedCategory);
      if (!selectedCategory) {
        throw {
          name: "NOT_FOUND",
        };
      }
     
      res.json({message : `Category with id ${id} success  to delete`});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
