/**
 * @author Gowri Kanagaraj
 */
const TicketAnalytics = require('../models/TicketAnalytics');
const DepartmentAnalytics = require('../models/DepartmentAnalytics');

exports.getTicketAnalytics = async (req, res) => {
  try {
    const ticketAnalytics = await TicketAnalytics.find();
    res.json(ticketAnalytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDepartmentAnalytics = async (req, res) => {
  try {
    const departmentAnalytics = await DepartmentAnalytics.find();
    res.json(departmentAnalytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};