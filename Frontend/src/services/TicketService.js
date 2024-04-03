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

export const GetTicketDetail = async (ticketId) => {
    try {
        return await axiosHelper.get(`tickets/${ticketId}`)
    } catch(error) {
        return error
    }
}

export const GetStatuses = async () => {
    try {
        return await axiosHelper.get(`tickets/statuses`)
    } catch(error) {
        console.log(error)
        return error
    }
}

export const GetPriorities = async () => {
    try {
        return await axiosHelper.get(`tickets/priorities`)
    } catch(error) {
        console.log(error)
        return error
    }
}

export const AddComment = async ({ ticketId, ...data }) => {
    try {
        return await axiosHelper.post(`tickets/${ticketId}/add-comment`, data)
    } catch(error) {
        return error
    }
}

export const AddAttachment = async (data) => {
    try {
        return await axiosHelper.post(`tickets/add-attachments`, data)
    } catch(error) {
        return error
    }
}