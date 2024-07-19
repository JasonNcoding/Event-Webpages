/**
 * Import operation model
 */
const Operation = require("../models/operation");
/**
 * Import category model
 */
const Category = require("../models/category");
/**
 * Import event model
 */
const Event = require("../models/event");
/**
 * Import constant module
 */
const constants = require("../utils/constants")

module.exports = {
  countOperations: async function (req, res) {
    try {
      if (await Operation.findOne({ nameEvent: constants.OPERATION_CREATE }) === null) {
        await addOperation(constants.OPERATION_CREATE);
      }
      if (await Operation.findOne({ nameEvent: constants.OPERATION_UPDATE }) === null) {
        await addOperation(constants.OPERATION_UPDATE);
      }
      if (await Operation.findOne({ nameEvent: constants.OPERATION_DELETE }) === null) {
        await addOperation(constants.OPERATION_DELETE);
      }

      let result = await Operation.find();
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /**
   * Increase an event count by number
   * @param {string} eventType
   * @param {number} amount
   */
  increment: async function (eventType, amount) {
    await Operation.updateOne(
      { nameEvent: eventType },
      { $inc: { numEvents: amount } }
    );
  },

  /**
   * Get the number of events
   * @returns the number of events
   */
  countEvents: async function (req, res) {
    try {
      let result = await Event.count({});
      res.json({ count: result });
    } catch (err) {
      res.status(400).json(err)
    }
  },

  /**
   * Get the number of categories
   * @returns the number of categories
   */
  countCategories: async function (req, res) {
    try {
      let result = await Category.count({});
      res.json({ count: result });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

/**
 * Create a new operation document
 * @param {string} eventType
 */
async function addOperation(eventType) {
  new Operation({
    numEvents: 0,
    nameEvent: eventType,
  }).save();
}
