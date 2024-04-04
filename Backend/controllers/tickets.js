/**
 * @author Darshit Dhameliya, Nisarg Vaghela
 */

const Attachment = require("../models/Attachment")
const Ticket = require("../models/Ticket")
const Status = require("../models/Status")
const Priority = require("../models/Priority")
const TicketComment = require("../models/TicketComment")
const fs = require('fs')

/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketData = async ({ id, ...data }) => {
    await Ticket.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true });
    return true
}

const createTicket = async (data) => {
    const { title, description, files, teamId } = data.data
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
        const status = await Status.findOne({ name: "Not Started" })
        const priority = await Priority.findOne({ name: "low" })
        await Ticket.create({
            title: title,
            description: description,
            attachments: attachments,
            team: teamId,
            status: status._id,
            priority: priority._id
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
    }).populate("status").populate("priority").populate("assignee");
}

const getTicketById = async (ticketId) => {
    return await Ticket.findById(ticketId).populate("attachments").populate("comments").populate("assignee").populate({
        path: 'comments',
        populate: {
          path: 'userId'
        }
      }).populate("status").populate("priority");
}

const getStatuses = async () => {
    return await Status.find({})
}

const getPriorities = async () => {
    return await Priority.find({})
}

const saveComment = async ({ ticketId, ...data }) => {
    const comment = await TicketComment.create(data)
    await Ticket.updateOne({ _id: ticketId }, { $push: { comments: comment } })
}

module.exports = {
    createTicket,
    addAttachments,
    updateTicketData,
    getTicketsByTeamId,
    getTicketById,
    getStatuses,
    getPriorities,
    saveComment
}