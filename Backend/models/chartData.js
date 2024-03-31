const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  month: String,
  value: Number
});

const ChartData = mongoose.model('ChartData', chartDataSchema);

module.exports = ChartData;