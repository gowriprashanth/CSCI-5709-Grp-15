/**
 * @author Darshit Dhameliya, Nisarg Vaghela
 */
const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const ticketController = require('../controllers/tickets');

router.put('/:id/update-status', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body
    if (id) {
      const message = await ticketController.updateTicketData({ id, status })
      res.status(StatusCodes.OK).send({ message });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Required missing data" });
    }
  } catch(error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.put('/:id/update-priority', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { priority } = req.body
    if (id) {
      const message = await ticketController.updateTicketData({ id, priority })
      res.status(StatusCodes.OK).send({ message });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Required missing data" });
    }
  } catch(error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.put('/:id/update-assignee', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { assignee } = req.body
    if (id) {
      const message = await ticketController.updateTicketData({ id, assignee })
      res.status(StatusCodes.OK).send({ message });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Required missing data" });
    }
  } catch(error) {
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
    const message = await ticketController.createTicket({ data: { title, description, files, teamId } })
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
    res.status(StatusCodes.OK).send(tickets);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.get('/statuses', async (req, res, next) => {
  try {
    const statuses = await ticketController.getStatuses()
    res.status(StatusCodes.OK).send(statuses)
  } catch(error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
})

router.get('/priorities', async (req, res, next) => {
  try {
    const priorities = await ticketController.getPriorities()
    res.status(StatusCodes.OK).send(priorities)
  } catch(error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
})

router.post('/:id/add-comment', async (req, res, next) => {
  try {
    const { comment } = req.body
    const { id: ticketId } = req.params
    if (!ticketId) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "ticketId is required" });
    } else if (!comment || !comment.length || comment.length > 300) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "comment is required and should not be more than 300 characters" });
    } else if (!req.user) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "User session not valid" });
    } else {
      const message = await ticketController.saveComment({ ticketId, comment, userId: req.user.userId })
      res.status(StatusCodes.OK).send({ message });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

router.get('/:ticketId', async (req, res, next) => {
  try {
    const { ticketId } = req.params
    if (!ticketId) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "ticketId is required" });
    } else {
      const ticketData = await ticketController.getTicketById(ticketId)
      res.status(StatusCodes.OK).send(ticketData);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message || error })
  }
});

module.exports = router;