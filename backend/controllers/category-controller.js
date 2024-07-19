/**
 * Import Category model
 */
const Category = require("../models/category");
/**
 * Import Event model
 */
const Event = require("../models/event");

/**
 * Method to generate ID from helper
 */
const getID = require("../utils/helper").generateId;
/**
 * Methods to update stats
 */
const statsController = require("./stats-controller");
/**
 * Import operation constants
 */
const constants = require("../utils/constants");

module.exports = {
  /**
   * Handler that creates a category and responds with the categoryId
   * @param {*} req
   * @param {*} res
   */
  addCategory: async function (req, res) {
    try {
      let category = new Category(req.body);
      category.categoryId = getID("C");
      let result = await category.save();
      await statsController.increment(constants.OPERATION_CREATE, 1);

      res.json({ id: result.categoryId });
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  getCategory: async function (req, res) {
    try {
      let category = await Category.findOne({categoryId: req.params.categoryId}).populate('eventsList');
      res.json(category);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  /**
   * Handler that responds with all categories
   * @param {*} req
   * @param {*} res
   */
  listAllCategories: async function (req, res) {
    try {
      let result = await Category.find().populate("eventsList");
      res.json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  /**
   * Handler that deletes category and responds with delete count
   * @param {*} req
   * @param {*} res
   */
  deleteByCategoryId: async function (req, res) {
    try {
      let category = await Category.findOne({categoryId: req.body.categoryId,});
      
      if (category != null && category.eventsList.length > 0) {
        await Event.deleteMany({ _id: { $in: category.eventsList }})
      }
      
      let result = await Category.deleteOne({categoryId: req.body.categoryId});
      await statsController.increment(constants.OPERATION_DELETE, result.deletedCount);

      res.json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  /**
   * Handler that updates a category and responds the update status
   * @param {*} req
   * @param {*} res
   */
  updateCategory: async function (req, res) {
    try {
      let result = await Category.updateOne( 
        { categoryId: req.body.categoryId }, 
        { $set: { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl }},
        { runValidator: true } );

      if ( result.matchedCount == 0 ) {
        res.json({ status: "id not found" });
        return;
      }
      
      if ( result.modifiedCount > 0 ) {
        await statsController.increment(constants.OPERATION_UPDATE, result.modifiedCount);
        res.json({ status: "updated successfully" });
      } else {
        res.json({ status: "no updates needed" });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};
