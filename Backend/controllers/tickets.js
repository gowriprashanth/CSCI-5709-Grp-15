/**
 * @author Darshit Dhameliya
 */

/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketStatus = (data) => {
    return data.message = "Updated by controller"
}

/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketPriority = (data) => {
    return data.message = "Updated by controller"
}

/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketAssignee = (data) => {
    return data.message = "Updated by controller"
}

module.exports = {
    updateTicketStatus,
    updateTicketPriority,
    updateTicketAssignee
}