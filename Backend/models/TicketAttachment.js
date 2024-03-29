const mongoose = require('mongoose');

const ticketAttachmentSchema =  new mongoose.Schema({
    id: mongoose.ObjectId,
    name: String,
    url: String,
    mimeType: {
        type: String,
        required: false
    },
    ticketId: mongoose.ObjectId
});

module.exports = mongoose.model('TicketAttachment', ticketAttachmentSchema)