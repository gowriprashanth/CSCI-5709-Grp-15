/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets")
const userRoutes = require("./userRoutes")
const analyticsRoutes = require("./analyticsRoutes");
const { verifyToken } = require("../middleware/verifyToken");
const teamsRoutes = require("./teamsRoutes");

const registerRoutes = (app) => {


const registerRoutes = (app) => {
  app.use("/user", userRoutes);
  app.use(verifyToken)
  app.use("/teams", teamsRoutes);
  app.use("/tickets", ticketRoutes);
  app.use("/analytics", analyticsRoutes);
};

module.exports = {
  registerRoutes,
};
