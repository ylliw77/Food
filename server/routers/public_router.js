const CategoryController = require('../controllers/controller_categories')
const ContentController = require('../controllers/controller_content')

const publicRouter = require('express').Router()

publicRouter.get('/pub/cuisines', ContentController.getAllCuisine)

publicRouter.get('/pub/cuisines/:id', ContentController.getCuisineById)

publicRouter.get('/pub/categories', CategoryController.getCategories)

module.exports = publicRouter