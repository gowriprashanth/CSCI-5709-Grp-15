/**
 * @author Gowri Kanagaraj
 */
const mongoose = require('mongoose');

const ticketAnalyticsSchema = new mongoose.Schema({
  month: String,
  value: Number
});

const TicketAnalytics = mongoose.model('TicketAnalytics', ticketAnalyticsSchema);

module.exports = TicketAnalytics;