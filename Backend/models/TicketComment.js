/**
 * @author Darshit Dhameliya
 */
const mongoose = require('mongoose');

const ticketCommentSchema =  new mongoose.Schema({
    comment: {
        type: String,
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    ticketId: {
        type: mongoose.ObjectId,
        ref: 'Ticket'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TicketComment', ticketCommentSchema)