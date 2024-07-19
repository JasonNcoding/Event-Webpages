/**
 * Importing the mongoose 
 */
const mongoose = require("mongoose");
/**
 * Import constants
 */
const constants = require("../utils/constants")

/**
 * Defining the schema for operations collection
 */
const operationSchema = mongoose.Schema({
    numEvents: {
        type: Number,
        default: 0,
        required: true
    },
    nameEvent: {
        type: String,
        required: true,
        enum: [constants.OPERATION_CREATE, constants.OPERATION_DELETE, constants.OPERATION_UPDATE]
    }
})

module.exports = mongoose.model("Operation", operationSchema)


