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

exports.getDepartmentAnalytics = async (req, res, next) => {
  try {
    const teams = await Team.find(); // Fetch all teams

    const data = await Promise.all(teams.map(async (team) => {
      const createdCount = await Ticket.countDocuments({ team: team._id });
      
      // Fetch the "resolved" status ID from the Status model
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