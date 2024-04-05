const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const teamController = require("../controllers/teamsController");
const team = require("../models/Team");
router.post("/create-team", async (req, res, next) => {
  try {
    const { id, name, description, order, isDeleted } = req.body;
    const members = req.body.members || [];
    if (!name) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Name is required" });
      return;
    }
    if (!description) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Description is required" });
      return;
    }
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "id is required" });
      return;
    }
    if (!order) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "order is required" });
      return;
    }
    const team = await teamController.createTeam({
      data: {
        id,
        name,
        description,
        order,
        isDeleted,
        members,
      },
    });
    res.status(StatusCodes.OK).send({ team });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message || error });
  }
});

router.get("/get-teams", async (req, res, next) => {
  try {
    const teams = await teamController.getAllTeams(req, res);
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/mark-delete/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const updatedTeam = await teamController.markDelete(teamId);

    return res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const update = req.body;
    const updatedTeam = await teamController.updateTeam(teamId, update);

    if (!updatedTeam) {
      return res.status(404).json(updatedTeam);
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json(updatedTeam);
  }
});

router.get("/getTeamLeads/:teamId", async (req, res, next) => {
  try {
    const teamLeads = await teamController.getTeamLeadsByTeamId(req, res);
    if (!teamLeads) {
      return res
        .status(404)
        .json({ message: "Team not found or no team leads found" });
    }

    res.status(200).json(teamLeads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
