const mongoose = require('mongoose');

const ticketCommentSchema =  new mongoose.Schema({
    id: mongoose.ObjectId,
    comment: String,
    userId: mongoose.ObjectId,
    ticketId: mongoose.ObjectId
});

module.exports = mongoose.model('TicketComment', ticketCommentSchema)