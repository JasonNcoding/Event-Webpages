/**
 * Importing the mongoose middleware
 * @cost
 */
const mongoose = require("mongoose");

/**
 * Defining the schema for category collection
 */
const categorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const regex = /^C[A-Z]{2}-[0-9]{4}$/;
                return regex.test(value);
            },
            message: "Category ID must follow 'CTO-1234' format"
        }
    },
	name:  {
        type: String,
        required: true,
        validate: {
            validator: /^[a-z0-9]+$/i,
            message: "Name must only contain alphanumeric characters"
        }
    },
    description: String,
    imageUrl: {
        type: String,
        required: false,
        default: "/category-default-image.jpg"
    },
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);
