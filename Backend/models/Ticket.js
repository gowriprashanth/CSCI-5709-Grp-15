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
        type: mongoose.ObjectId,
        ref: 'User'
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
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)
