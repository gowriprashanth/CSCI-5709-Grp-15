/**
 * @author Darshit Dhameliya, Nisarg Vaghela
 */

const Attachment = require("../models/Attachment")
const Ticket = require("../models/Ticket")
const fs = require('fs')
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


const createTicket = async (data) => {
    const { title, description, files } = data.data
    await Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
            Attachment.create({
                type: file.type,
                name: file.name,
                path: file.path,
                url: file.url
            }).then((attachment) => {
                resolve(attachment)
            }).catch((err) => {
                reject(err)
            });
        })
    })).then(async (attachments) => {
        await Ticket.create({
            title: title,
            description: description,
            attachments: attachments
        })
        return data.message = "Ticket created successfully"
    }).catch((err) => {
        console.log(err)
        return data.message = "Failed to create ticket"
    })
}


const addAttachments = async (data) => {
    const { ticketId, files } = data.data
    await Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
            Attachment.create({
                type: file.type,
                name: file.name,
                path: file.path,
                url: file.url
            }).then((attachment) => {
                resolve(attachment)
            }).catch((err) => {
                reject(err)
            });
        })
    })).then(async (attachments) => {
        await Ticket.updateOne({ _id: ticketId }, { $push: { attachments: attachments } })
        return data.message = "Attachment added successfully"
    }).catch((err) => {
        console.log(err)
        return data.message = "Failed to add attachment"
    })
}

const getTicketsByTeamId = async (data) => {
    const { teamId } = data
    return await Ticket.find({
        team: teamId
    });
}


module.exports = {
    createTicket,
    addAttachments,
    updateTicketStatus,
    updateTicketPriority,
    updateTicketAssignee,
    getTicketsByTeamId
}