const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Team = require('../models/Team');
const User = require('../models/User');

const getNotificationById = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email ID is required' });
        }

        const userNotifications = await Notification.find({ userId: email, read: false });

        if (!userNotifications || userNotifications.length === 0) {
            return res.status(404).json({ message: 'Notifications not found for this email ID' });
        }

        res.status(200).json(userNotifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const storeNotificationByTeamId =  async (teamId, message, owner) => {
    try {
        
        const team = await Team.findOne({ _id: teamId }, { members: 1 }).populate("members");
        const teamMembers = team.members;
        if(owner){
            const newNotification = new Notification({
                message: message,
                userId: owner
            });
            newNotification.save();
        }
        // Create a new notification instanc
        teamMembers?.forEach((member) => {
            const newNotification = new Notification({
                message: message,
                userId: member.email
            });
            // Save the notification to the database
            newNotification.save();
        });
    } catch (err) {
        console.error(err);
    }
};

const storeNotificationToAllMember =  async (name) => {
    try {

     
        const users = await User.find({});
       
        // const allMembers = team.members;
        users?.forEach((member) => {
            const newNotification = new Notification({
                message: `New Team Added ${name}`,
                userId: member.email
            });
                    // Save the notification to the database

            newNotification.save();
        });
    } catch (err) {
        console.error(err);
    }
};

const storeNotificationToIndividualUser =  async (email, message) => {
    try {
            const newNotification = new Notification({
                message: message,
                userId: email
            });
            newNotification.save();
    } catch (err) {
        console.error(err);
    }
};

const storeNotificationAssignee =  async (assignee, title) => {
    try {
        assignee?.forEach((member) => {
            const newNotification = new Notification({
                message: `Ticket data updated ${title}`,
                userId: member.email
            });
                    // Save the notification to the database

            newNotification.save();
        });

    } catch (err) {
        console.error(err);
    }
};

const updateReadFlag = async (req, res) => {
    try {
      const notificationId = req.params.id;
      const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
      
      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      res.status(200).json(updatedNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    getNotificationById,
    storeNotificationByTeamId,
    updateReadFlag,
    storeNotificationToAllMember,
    storeNotificationToIndividualUser,
    storeNotificationAssignee
};
  