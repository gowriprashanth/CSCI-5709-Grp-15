const express = require("express");
const router = express.Router();
const KnowledgeBaseController = require("../controllers/KnowledgeBaseController");

// Route to create a new Kbase entry
router.post("/create-kbase", KnowledgeBaseController.createKbase);

// Route to get all Kbase entries
router.get("/get-allkbase", KnowledgeBaseController.getAllKbases);

// Route to add a new FAQ entry to a specific Kbase entry by title
router.post("/add-faq", KnowledgeBaseController.addFaqToKbaseByTitle);

// Route to delete a specific Kbase entry by ID
router.post("/delete-kbase", KnowledgeBaseController.deleteKbaseByTitle);

module.exports = router;
