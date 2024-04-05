/**
 * @author Bhautik Koshiya
 */
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    },
    userId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Notification", notificationSchema);
