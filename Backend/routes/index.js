/**
 * @author Darshit Dhameliya
 */
const ticketRoutes = require("./tickets") 

const registerRoutes = (app) => {
  app.use("/tickets", ticketRoutes);
}

module.exports = {
  registerRoutes
}
