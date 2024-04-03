const mongoose = require('mongoose');
const TicketAttachment = require('./TicketAttachment').schema;
const TicketComment = require('./TicketComment').schema;

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: [TicketAttachment],
    comments: [TicketComment],
    assignee: [{
        userId: mongoose.ObjectId
    }],
    priority: String,
    status: String,
    createdAt: Date,
    modifiedAt: Date
})

module.exports = mongoose.model('Ticket', ticketSchema)
