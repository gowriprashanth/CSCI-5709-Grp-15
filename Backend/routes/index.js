/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets") 
const userRoutes = require("./userRoutes")
const analyticsRoutes = require("./analyticsRoutes")

const registerRoutes = (app) => {
  app.use("/tickets", ticketRoutes);
  app.use("/user", userRoutes);
  app.use("/analytics",analyticsRoutes);
}

module.exports = {
  registerRoutes
}
