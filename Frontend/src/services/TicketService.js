/**
 * @author Darshit Dhameliya
 */
import axiosHelper from "../helper/axioshelper"

/**
 * It calls backend API to update the status of the ticket
 */
export const UpdateTicketStatus = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.put(`tickets/${ticketId}/update-status`, data)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to update the priority of the ticket
 */
export const UpdateTicketPriority = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.put(`tickets/${ticketId}/update-priority`, data)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to change the assignee of the ticket
 */
export const UpdateTicketAssignee = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.put(`tickets/${ticketId}/update-assignee`, data)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to get the details of the ticket
 */
export const GetTicketDetail = async (ticketId) => {
    try {
        return await axiosHelper.get(`tickets/${ticketId}`)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to fetch all the statuses
 */
export const GetStatuses = async () => {
    try {
        return await axiosHelper.get(`tickets/statuses`)
    } catch(error) {
        console.log(error)
        return error
    }
}

/**
 * It calls backend API to fetch all the priorities
 */
export const GetPriorities = async () => {
    try {
        return await axiosHelper.get(`tickets/priorities`)
    } catch(error) {
        console.log(error)
        return error
    }
}

/**
 * It calls backend API to add new comment in the ticket
 */
export const AddComment = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.post(`tickets/${ticketId}/add-comment`, data)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to add new attachment to the ticket
 */
export const AddAttachment = async (data) => {
    try {
        return await axiosHelper.post(`tickets/add-attachments`, data)
    } catch(error) {
        return error
    }
}

/**
 * It calls backend API to fetch all the users
 */
export const GetUsers = async (teamId) => {
    try {
        return await axiosHelper.get(`team-members/${teamId}?populate=true`)
    } catch(error) {
        return error
    }
}