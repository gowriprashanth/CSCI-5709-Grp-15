/**
 * @author Darshit Dhameliya, Nisarg Vaghela
 */

const Attachment = require("../models/Attachment")
const Ticket = require("../models/Ticket")
const Status = require("../models/Status")
const Priority = require("../models/Priority")
const TicketComment = require("../models/TicketComment")
const User = require("../models/User")
const fs = require('fs')
const Team = require("../models/Team")
const { StatusCodes } = require("http-status-codes")
const {storeNotificationByTeamId, storeNotificationAssignee} = require("./NotificationController")
const { sendEmail } = require("../middleware/email");
/**
 * It perfoms ticket update operation
 * @param data 
 * @returns 
 */
const updateTicketData = async ({ id, ...data }) => {
    const ticketData = (await Ticket.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true }).populate("assignee"));
    if (ticketData.status == "660d958b96bd49242ec3912c") {
        assignTickets(ticketData.team)
    }
    storeNotificationAssignee(ticketData.assignee, ticketData.title)
    ticketData.assignee.forEach((member) => {
        sendEmail(member.email, "Ticket Updated",  `${ticketData.title} ticket is udpated`)
    });
    return true
}

const createTicket = async (data) => {
    const { title,email, description, files, teamId } = data.data
    storeNotificationByTeamId(teamId, `Ticket (${title}) Created under your team.`, email);
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
        assignTickets(teamId)
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

const markEscalated = async (ticketId) => {
    await Ticket.updateOne({ _id: ticketId }, { $set: { isEscalated: true } })
    Ticket.findById(ticketId).then((ticket)=>{
        storeNotificationByTeamId(ticket.team,`Ticket (${ticket.title}) escalated to team leads!`)
    })
    return data.message = "Ticket escalated successfully"
}

/**
 * It returns ticket data of given team
 */
const getTicketsByTeamId = async (teamId, retrieveAll = false) => {
    if (retrieveAll) {
        return await Ticket.find({
            team: teamId
        }).populate("status").populate("priority").populate("assignee");
    } else {
        return await Ticket.find({
            team: teamId,
            status: {
                "$ne": "660d958b96bd49242ec3912c"
            }
        }).populate("status").populate("priority").populate("assignee");
    }
}

/**
 * It returns ticket data of given ticket id
 */
const getTicketById = async (ticketId, user) => {
    const ticketData = await Ticket.findById(ticketId).populate("attachments").populate("comments").populate("assignee").populate({
        path: 'comments',
        populate: {
            path: 'userId'
        }
    }).populate("status").populate("priority");
    if (ticketData && ticketData.team) {
        const userData = await User.findById(user.userId)
        const teamData = await Team.findById(ticketData.team)
        if(user.role.toLowerCase() === "admin" || userData.teamLead.includes(ticketData.team) || teamData.members.includes(user.userId)) {
            return ticketData
        } else {
            return Promise.reject({ status: StatusCodes.FORBIDDEN })
        }
    } else {
        return {}
    }
}

/**
 * It returns all the statuses
 */
const getStatuses = async () => {
    return await Status.find({})
}

/**
 * It returns all the priorities
 */
const getPriorities = async () => {
    return await Priority.find({})
}

/**
 * It saves comment added by user
 */
const saveComment = async ({ ticketId, ...data }) => {
    const comment = await TicketComment.create(data)
    await Ticket.updateOne({ _id: ticketId }, { $push: { comments: comment } })
}

/**
 * It fetches all the closed tickets for logged in user
 * @param {*} user 
 * @returns 
 */
const fetchAllResolvedTickets = async (user) => {
    try {
        if(user.role.toLowerCase() === "admin") {
            const data = await Ticket.find({ status: "660d958b96bd49242ec3912c" }).populate("attachments").populate("comments").populate("assignee").populate({
                path: 'comments',
                populate: {
                    path: 'userId'
                }
            }).populate("status").populate("priority")
            return data
        } else {
            const userData = await User.findById(user.userId)
            const teamData = await Team.find({ members: user.userId })
            const data = await Ticket.find({ status: "660d958b96bd49242ec3912c", team: {
                "$in": [...userData.teamLead, ...teamData.map(e => e._id)]
            } }).populate("attachments").populate("comments").populate("assignee").populate({
                path: 'comments',
                populate: {
                    path: 'userId'
                }
            }).populate("status").populate("priority")
            return data
        }
    } catch (error) {
      return { message: error.message };
    }
}

/**
 * It auto assigns ticket to the next available team member
 * @param {*} teamId 
 * @returns 
 */
const assignTickets = async (teamId) => {
    try {
        const teamData = await Team.findById(teamId)
        const ticketData = await Ticket.find({ team: teamId, status: {
            "$ne": "660d958b96bd49242ec3912c"
        }})
        if (teamData && teamData.members) {
            const usersByTicketCount = {}
            teamData.members.reduce((acc, member) => {
                let count = 0;
                ticketData.forEach((ticket) => {
                    if(ticket.assignee.includes(member)) {
                        count++;
                    }
                })
                usersByTicketCount[member] = count
                return acc
            }, [])
            const sortedUsersByLowestTickets = Object.fromEntries(
                Object.entries(usersByTicketCount).sort(([,a],[,b]) => a-b)
            );
            const userIds = Object.keys(sortedUsersByLowestTickets)
            const unAssignedTicketData = await Ticket.find({ team: teamId, assignee: { $size: 0 }})
            let i=0; j=0;
            while (j < unAssignedTicketData.length) {
                if (i === userIds.length) {
                    i = 0;
                }
                if (sortedUsersByLowestTickets[userIds[i]] < 5) {
                    await Ticket.findByIdAndUpdate(unAssignedTicketData[j]._id, { $set: { assignee: [userIds[i]] } })
                    i++;
                }
                j++;
            }
        }
        return true
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    createTicket,
    addAttachments,
    updateTicketData,
    getTicketsByTeamId,
    markEscalated,
    getTicketById,
    getStatuses,
    getPriorities,
    saveComment,
    fetchAllResolvedTickets,
    assignTickets
}