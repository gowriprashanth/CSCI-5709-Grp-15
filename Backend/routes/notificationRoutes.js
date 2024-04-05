const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

router.get("/getNotification", NotificationController.getNotificationById);
// router.post("/store", NotificationController.storeNotification);
router.put('/:id', NotificationController.updateReadFlag);

module.exports = router;
