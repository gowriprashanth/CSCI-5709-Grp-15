/**
 * @author Nisarg Vaghela
 */

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachments: [{
        type: mongoose.ObjectId,
        ref: 'Attachments'
    }],
    comments: [{ type: mongoose.ObjectId, ref: 'TicketComment' }],
    assignee: [{
        userId: mongoose.ObjectId
    }],
    priority: { type: mongoose.ObjectId, ref: 'Priority' },
    status: { type: mongoose.ObjectId, ref: 'Status' },
    isEscalated: {
        type: Boolean,
        default: false
    },
    team: {
        type: mongoose.ObjectId,
        ref: 'Team'
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)
