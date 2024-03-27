/**
 * @author Darshit Dhameliya
 */
const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const ticketController = require('../controllers/tickets');

router.put('/:id/update-status', async (req, res, next) => {
  try {
    const message = await ticketController.updateTicketStatus({ message: "Hello" })
    res.status(StatusCodes.OK).send({ message });
  } catch(error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.put('/:id/update-priority', async (req, res, next) => {
    try {
      const message = await ticketController.updateTicketPriority({ message: "Hello" })
      res.status(StatusCodes.OK).send({ message });
    } catch(error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
    }
});

router.put('/:id/update-assignee', async (req, res, next) => {
    try {
      const message = await ticketController.updateTicketAssignee({ message: "Hello" })
      res.status(StatusCodes.OK).send({ message });
    } catch(error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
    }
});

module.exports = router;