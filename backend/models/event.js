/**
 * Importing the mongoose middleware
 * @const
 */
const mongoose = require("mongoose");

/**
 * Defining the schema for event collection
 */
const eventSchema = mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    startDateTime: {
        type: Date,
        required: true
    },
    durationInMinutes: {
        type: Number,
        required: true,
        validate: {
			validator: function (value) {
				return value >= 0;
			},
			message: "Duration must be a non-negative integer ",
		}
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    image: {
        type: String,
        required: false,
        default: "/event-default-image.jpg"
    },
    capacity: {
        type: Number,
        required: false,
        default: 1000,
        validate: {
			validator: function (value) {
				return value >= 10 && value <= 2000;
			},
			message: "Capacity must be between 10 and 2000",
		}
    },
    ticketAvailable: {
        type: Number,
        required: false,
        validate: {
			validator: function (value) {
				return value >= 0 && value <= 2000;
			},
			message: "Ticket available must be between 0 and 2000",
		}
    },
    categoriesList: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    }],
});


module.exports = mongoose.model("Event", eventSchema);