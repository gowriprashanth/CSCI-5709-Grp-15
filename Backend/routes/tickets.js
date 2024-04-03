/**
 * @author Darshit Dhameliya
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

module.exports = router;