//Controller

const CategoryController = require("../controllers/controller_categories");
const ContentController = require("../controllers/controller_content");

// Authentication

const verifiedUser = require("../middlewares/authentication");

// Authorization

const { adminAndStaffOnly } = require("../middlewares/authorization");

// Multer

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routing

const routeContent = require("express").Router();

routeContent.use(verifiedUser);

// MAIN ENTITY

routeContent.get("/cuisines", ContentController.getCuisineforCMS);
routeContent.get("/cuisines/:id", ContentController.getCuisineById);
routeContent.post("/cuisines", ContentController.addCuisine);
routeContent.put(
  "/cuisines/:id",
  adminAndStaffOnly,
  ContentController.editCuisineById
);
routeContent.delete(
  "/cuisines/:id",
  adminAndStaffOnly,
  ContentController.deleteCuisineById
);
routeContent.patch(
  "/cuisines/:id/img-url",
  adminAndStaffOnly,
  upload.single("imgUrl"),
  ContentController.uploadImageById
);

// SUPPORT ENTITY

routeContent.get("/categories", CategoryController.getCategories);
routeContent.post("/categories", CategoryController.addCategory);
routeContent.put("/categories/:id", CategoryController.ediCategoryById);
routeContent.delete("/categories/:id", CategoryController.removeCategoryById);

module.exports = routeContent;
