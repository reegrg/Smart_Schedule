const Events = require("../models/EventModel");

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
    console.log(error);
    res.status(500).json({ msg: error.message });
  };

  const createEvent = async (req, res) => {
    try {
      const { title, description, startTime, endTime } = req.body;
  
      // Validate and format the incoming data
      if (!title || !startTime || !endTime) {
        return res.status(400).json({ msg: "Missing required fields" });
      }
  
      const newEvent = new Events({
        user: req.user.id,
        title,
        description,
        startTime,  // Keep as string
        endTime,    // Keep as string
      });
  
      await newEvent.save();
      res.status(201).json({ msg: "Event created successfully", event: newEvent });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };
  

const getEvent = async(req, res) => {
    try {
        // use the authenticated user's id to fetch their notes
      const events = await Events.find({user: req.user.id});
        return res
          .status(200)
          .json({ msg: "Events fetched successfully", events });
      } catch (error) {
        sendErrorResponse(res, error);
      }
};

module.exports = {createEvent, getEvent};