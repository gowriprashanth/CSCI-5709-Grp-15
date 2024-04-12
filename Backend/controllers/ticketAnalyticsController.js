/**
 * @author Gowri Kanagaraj
 */
const Ticket = require('../models/Ticket');
const Team = require('../models/Team');
const Status = require('../models/Status');
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

exports.getTicketStatus = async (req, res) => {
  try {

    const ticketStatusCounts = await Ticket.aggregate([
      {
        $group: {
          _id: "$status", 
          count: { $sum: 1 }
        }
      }
    ]);

    
    const statusCounts = {};
    await Promise.all(ticketStatusCounts.map(async (statusCount) => {
      const status = await Status.findById(statusCount._id);
      const statusName = status ? status.name : "Unknown";
      if (!statusCounts[statusName]) {
        statusCounts[statusName] = [];
      }
      statusCounts[statusName].push({ count: statusCount.count });
    }));

    // Prepare response data
    const responseData = Object.entries(statusCounts).map(([status, counts]) => ({
      status,
      data: counts
    }));

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error fetching ticket status:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching ticket status.' });
  }
};

exports.getDepartmentAnalytics = async (req, res, next) => {
  try {
    const teams = await Team.find();
    const data = await Promise.all(teams.map(async (team) => {
      const createdCount = await Ticket.countDocuments({ team: team._id });
      
      const resolvedStatus = await Status.findOne({ name: 'Resolved' });
      const resolvedCount = await Ticket.countDocuments({ team: team._id, status: resolvedStatus._id });

      return {
        team: team.name,
        created: createdCount,
        resolved: resolvedCount,
      };
    }));

    res.json({  
      data: data
    });
    console.log(data)
  } catch (error) {
    next(error);
  }
};