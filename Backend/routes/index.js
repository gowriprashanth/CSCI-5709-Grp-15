/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets") 
const userRoutes = require("./userRoutes")
const chartRoutes = require("./chartRoutes")

const registerRoutes = (app) => {
  app.use("/tickets", ticketRoutes);
  app.use("/user", userRoutes);
  app.use("/chart",chartRoutes);
}

module.exports = {
  registerRoutes
}
