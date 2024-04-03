/**
 * @author Darshit Dhameliya, Nisarg Vaghela
 */
const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const ticketController = require('../controllers/tickets');

router.put('/:id/update-status', async (req, res, next) => {
  try {
    const message = await ticketController.updateTicketStatus({ message: "Hello" })
    res.status(StatusCodes.OK).send({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.put('/:id/update-priority', async (req, res, next) => {
  try {
    const message = await ticketController.updateTicketPriority({ message: "Hello" })
    res.status(StatusCodes.OK).send({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.put('/:id/update-assignee', async (req, res, next) => {
  try {
    const message = await ticketController.updateTicketAssignee({ message: "Hello" })
    res.status(StatusCodes.OK).send({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.post('/create', async (req, res, next) => {
  try {
    //TODO: add teamId in request body
    const { teamId, title, description, files = [] } = req.body
    if (!teamId) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "teamId is required" });
      return
    }
    if (!title) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "title is required" });
      return
    }
    if (!description) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "description is required" });
      return
    }
    const message = await ticketController.createTicket({ data: { title, description, files } })
    res.status(StatusCodes.OK).send({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});


router.post('/add-attachments', async (req, res, next) => {
  try {
    let { ticketId, files } = req.body
    if (!ticketId) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "ticketId is required" });
      return
    }
    if (!files || !files.length) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "files is required" });
      return
    }
    const message = await ticketController.addAttachments({ data: { ticketId, files } })
    res.status(StatusCodes.OK).send({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});


router.get('/get/:teamId', async (req, res, next) => {
  try {
    const { teamId } = req.params
    if (!teamId) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "teamId is required" });
      return
    }
    const tickets = await ticketController.getTicketsByTeamId({ teamId })
    res.status(StatusCodes.OK).send({ tickets });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

module.exports = router;