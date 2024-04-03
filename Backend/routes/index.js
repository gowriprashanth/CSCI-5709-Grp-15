/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets")
const userRoutes = require("./userRoutes")
const analyticsRoutes = require("./analyticsRoutes");
const { verifyToken } = require("../middleware/verifyToken");

const registerRoutes = (app) => {
  app.use("/user", userRoutes);
  app.use(verifyToken)
  app.use("/tickets", ticketRoutes);
  app.use("/analytics", analyticsRoutes);
}

module.exports = {
  registerRoutes
}
