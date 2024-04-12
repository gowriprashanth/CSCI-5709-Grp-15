/**
 * @author Gowri Kanagaraj
 */
const express = require('express');
const router = express.Router();
const ticketAnalyticsController = require('../controllers/ticketAnalyticsController');

router.get('/ticket', ticketAnalyticsController.getTicketAnalytics);
router.get('/department', ticketAnalyticsController.getDepartmentAnalytics);
router.get('/status',ticketAnalyticsController.getTicketStatus);

module.exports = router;