/**
 * @author Nisarg Vaghela
 */

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Attachments', TeamSchema)
