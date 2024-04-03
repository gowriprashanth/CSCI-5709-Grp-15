/**
 * @author Darshit Dhameliya
 */

const Ticket = require("../models/Ticket");

/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketData = async ({ id, ...data }) => {
    await Ticket.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true });
    return true
}

module.exports = {
    updateTicketData
}