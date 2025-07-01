import Event from "../model/event.model.js";

export const getEvent = async(req, res) => {
    try {
        const event = await Event.find();
        res.status(200).json(event);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};