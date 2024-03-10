const { Op } = require("sequelize");
const { Cuisine, User, Category } = require("../models");

const { v2: cloudinary } = require("cloudinary");
const { CLOUDINARY_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

class ContentController {
  static async getAllCuisine(req, res, next) {
    try {
      let options = {
        offset: 1,
        limit: 10,
        include: [User, Category],
        order: [["id", "ASC"]],
      };
      if (req.query.search) {
        options.where = {
          name: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      if (req.query.page) {
        options.offset = (req.query.page - 1) * options.limit;
      }

      if (req.query.category) {
        options.where = {
          categoryId: Number(req.query.category),
        };
      }

      const menu = await Cuisine.findAll(options);

      res.status(200).json(menu);
    } catch (err) {
      next(err);
    }
  }

  static async getCuisineforCMS(req, res, next) {
    try {
      let options = {
        include: [User, Category],
        order: [["updatedAt", "DESC"]],
      };

      const menu = await Cuisine.findAll(options);

      res.status(200).json(menu);
    } catch (err) {
      next(err);
    }
  }
  static async getCuisineById(req, res, next) {
    try {
      const { id } = req.params;
      const selectedCuisine = await Cuisine.findByPk(id, {
        include: [User, Category],
      });

      if (!selectedCuisine) {
        throw { name: "NOT_FOUND" };
      }

      res.status(200).json(selectedCuisine);
    } catch (err) {
      next(err);
    }
  }
  static async addCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const newMenu = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json(newMenu);
    } catch (err) {
      next(err);
    }
  }
  static async editCuisineById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, categoryId } = req.body;

      const editedMenu = await Cuisine.update(
        { name, description, price, imgUrl, categoryId },
        {
          returning: true,
          where: { id },
        }
      );

      if (!editedMenu[0]) {
        throw { name: "NOT_FOUND" };
      }

      res.json(editedMenu[1]);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCuisineById(req, res, next) {
    try {
      const { id } = req.params;

      const selectedMenu = await Cuisine.destroy({ where: { id } });

      if (!selectedMenu) {
        throw {
          name: "NOT_FOUND",
        };
      }

      res.json({
        message: `Cuisine with id ${id} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async uploadImageById(req, res, next) {
    try {
      const { id } = req.params;
      const selectedData = await Cuisine.findByPk(id);

      if (!selectedData) {
        throw { name: `NOT_FOUND` };
      }

      // Cloudinary
      const convertBuffer = req.file.buffer.toString("base64");
      const toUpload = `data:${req.file.mimetype};base64,${convertBuffer}`;
      const uploadedFile = await cloudinary.uploader.upload(toUpload, {
        public_id: new Date().getTime(),
        folder: "gc01",
        resource_type: "auto",
      });

      // Update Menu/Cuisine

      await selectedData.update({ imgUrl: uploadedFile.secure_url });

      res.json({ message: `Image Url has been updated` });
    } catch (err) {
      console.log(err, "<<<<");
      next(err);
    }
  }
}

module.exports = ContentController;
