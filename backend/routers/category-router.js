/**
 * Express module
 * @const
 */
const express = require("express");
/**
 * get router from express
 * @router
 */
const router = express.Router();
/**
 * Importing the category controller
 */
const categoryController = require("../controllers/category-controller")

/**
 * Handle the add category request
 */
router.post("/add", categoryController.addCategory);
/**
 * Handle the get category request
 */
router.get("/:categoryId/retrieve", categoryController.getCategory);
/**
 * Handle the get categories request
 */
router.get("/list", categoryController.listAllCategories);
/**
 * Handle the delete category request
 */
router.delete("/delete", categoryController.deleteByCategoryId);
/**
 * Handle the update category request
 */
router.put("/update", categoryController.updateCategory);

module.exports = router;