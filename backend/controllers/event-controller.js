/**
 * Import Category model
 */
const Category = require( "../models/category" );
/**
 * Import Event model
 */
const Event = require( "../models/event" );
/**
 * Generated ID for a new event
 */
const getID = require( "../utils/helper" ).generateId;
/**
 * Methods to update stats
 */
const statsController = require( "./stats-controller" );
/**
 * Constants module
 * @const
 */
const constants = require( "../utils/constants" );

module.exports = {
    /**
     * Create a new event
     * @param {*} req 
     * @param {*} res 
     */
    createEvent: async function ( req, res )
    {
        try
        {
            // Pre-condition 
            let ticketAvailable = req.body.ticketAvailable
            if ( req.body.ticketAvailable == undefined )
            {
                ticketAvailable = req.body.capacity;
            }
            // Push new event

            let aEvent = new Event( {
                eventId: getID( "E" ),
                name: req.body.name,
                desc: req.body.desc,
                startDateTime: req.body.startDateTime,
                durationInMinutes: req.body.durationInMinutes,
                isActive: req.body.isActive,
                image: req.body.image,
                ticketAvailable: ticketAvailable,
                capacity: req.body.capacity,
            } );

            // Update category's eventList

            let categoryIds = req.body.categoriesList.split( "," ).map( ( item ) => item.trim() );

            for ( let categoryId of categoryIds )
            {
                let foundCategory = await Category.findOne( {
                    categoryId: categoryId,
                } );
                if ( foundCategory == null )
                {
                    let aCategory = await new Category( {
                        'categoryId': categoryId,
                        'name': 'categoryName',
                        'description': 'categoryDesc'
                    } ).save();
                    aEvent.categoriesList.push( aCategory._id );

                    // Add new created count for category
                    await statsController.increment( constants.OPERATION_CREATE, 1 );
                } else
                {
                    aEvent.categoriesList.push( foundCategory._id );
                }
            }
            // Add new created count for event

            await statsController.increment( constants.OPERATION_CREATE, 1 );
            let savedEvent = await aEvent.save();

            let updateCategories = await Category.updateMany(
                { _id: { $in: savedEvent.categoriesList } },
                { $push: { eventsList: savedEvent._id } } )

            // Add new updated count for category
            await statsController.increment( constants.OPERATION_UPDATE, updateCategories.matchedCount );

            res.status( 200 ).json( aEvent );

        } catch ( err )
        {
            res.status( 400 ).json( err.message );
        }
    },
    /**
     * Get the list of the events without filter and return JSON file 
     * @param {*} req 
     * @param {*} res 
     */
    getAll: async function ( req, res )
    {
        try
        {
            let events = await Event.find().populate('categoriesList');
            res.status( 200 ).json( events );
        } catch ( err )
        {
            res.status( 400 ).json( err.message );
        }
    },
    /**
    * Remove event by their Event ID
    * @param {*} req 
    * @param {*} res 
    */
    removeEvent: async function ( req, res )
    {
        try
        {
            let eventId = req.body.eventId;
            let obj = await Event.deleteOne( { eventId: eventId } );
            // Add new deleted count for event
            await statsController.increment( constants.OPERATION_DELETE, obj.deletedCount );
            res.json( obj );
        } catch ( err )
        {
            res.status( 400 ).json( err.message );
        }
    },
    /**
     * Update event name and capacity by finding their Event ID 
     * @param {*} req 
     * @param {*} res 
     */
    updateEvent: async function ( req, res )
    {
        try
        {
            let eventId = req.body.eventId;
            let obj = await Event.updateOne( { eventId: eventId }, { $set: { name: req.body.name, capacity: req.body.capacity } } );

            if ( obj.matchedCount == 0 )
            {
                res.json( { "status": "ID not found" } );
            }
            else
            {
                let countCategory = await Event.findOne( { eventId: eventId } );
                // Add new updated count for category
                await statsController.increment( constants.OPERATION_UPDATE, countCategory.categoriesList.length );

                // Add new updated count for event
                await statsController.increment( constants.OPERATION_UPDATE, obj.modifiedCount );
                res.json( { "status": "Updated successfully" } );
            }

        } catch ( err )
        {
            res.status( 400 ).json( err.message );
        }
    },
    /**
     * Update event name and capacity by finding their Event ID 
     * @param {*} req 
     * @param {*} res 
     */
    eventDetail: async function ( req, res )
    {
        try
        {
            let obj = await Event.findOne( { eventId: req.params.eventId }).populate('categoriesList');
            res.status( 200 ).json( obj );

        } catch ( err )
        {
            res.status( 400 ).json( err.message );
        }
    }

};