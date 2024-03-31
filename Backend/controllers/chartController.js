const ChartData = require('../models/chartData');

exports.getChartData = async (req, res) => {
  try {
    const chartData = await ChartData.find();
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};