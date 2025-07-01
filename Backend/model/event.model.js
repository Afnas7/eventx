import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
});
const Event = mongoose.model("Event", eventSchema);

export default Event;


