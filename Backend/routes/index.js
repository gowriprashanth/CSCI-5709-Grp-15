/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets");
const userRoutes = require("./userRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const kbaseRoutes = require("./kbaseRoutes");

const registerRoutes = (app) => {
  app.use("/tickets", ticketRoutes);
  app.use("/user", userRoutes);
  app.use("/analytics", analyticsRoutes);
  app.use("/knowledgebase", kbaseRoutes);
};

module.exports = {
  registerRoutes,
};
