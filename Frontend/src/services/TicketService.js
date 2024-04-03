import axiosHelper from "../helper/axioshelper"

export const UpdateTicketStatus = async ({ ticketId, ...data }) => {
    try {
        console.log("called")
        return await axiosHelper.put(`tickets/${ticketId}/update-status`, data)
    } catch(error) {
        return error
    }
}

export const UpdateTicketPriority = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.put(`tickets/${ticketId}/update-priority`, data)
    } catch(error) {
        return error
    }
}

export const UpdateTicketAssignee = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.put(`tickets/${ticketId}/update-assignee`, data)
    } catch(error) {
        return error
    }
}