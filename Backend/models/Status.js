const mongoose = require('mongoose');

const statusSchema =  new mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Status', statusSchema)