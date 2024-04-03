/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets");
const userRoutes = require("./userRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const { verifyToken } = require("../middleware/verifyToken");
const teamsRoutes = require("./teamsRoutes");
const teamMemberRoutes = require("./teamMembersRoutes");
const users = require("./users");

const registerRoutes = (app) => {
  app.use("/user", userRoutes);
  app.use(verifyToken);
  app.use("/teams", teamsRoutes);
  app.use("/team-members", teamMemberRoutes);
  app.use("/tickets", ticketRoutes);
  app.use("/analytics", analyticsRoutes);
  app.use("/users", users);
};

module.exports = {
  registerRoutes,
};
