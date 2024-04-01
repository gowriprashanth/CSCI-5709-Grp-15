/**
 * @author Nisarg Vaghela
 */


const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    type: String,
    name: String,
    path: String,
    url: String
})

module.exports = mongoose.model('Attachments', AttachmentSchema)
