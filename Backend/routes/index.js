/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets") 
const userRoutes = require("./userRoutes")

const registerRoutes = (app) => {
  app.use("/tickets", ticketRoutes);
  app.use("/user", userRoutes);
}

module.exports = {
  registerRoutes
}
