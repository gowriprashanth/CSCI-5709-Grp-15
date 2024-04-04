const Kbase = require("../models/Kbase");

// Controller to create a new Kbase entry
const createKbase = async (req, res) => {
  try {
    const { title } = req.body;

    // Create a new Kbase instance
    const newKbase = new Kbase({
      title,
    });

    // Save the new Kbase entry to the database
    await newKbase.save();

    res.status(201).json({ message: "Kbase entry created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Controller to retrieve all Kbase entries
const getAllKbases = async (req, res) => {
  try {
    // Fetch all Kbase entries from the database
    const kbases = await Kbase.find();
    // res.status(200).send("Get all Kbase");

    res.json(kbases);
  } catch (error) {
    console.error(error.message);
    // return res.status(500).json({ message: "Server Error" });
    res.status(500).send("Server Error");
  }
};

// Controller to delete a specific Kbase entry by title
const deleteKbaseByTitle = async (req, res) => {
  try {
    const { title } = req.body;

    // Find and delete the Kbase entry by title from the database
    const deletedKbase = await Kbase.findOneAndDelete({ title });

    if (!deletedKbase) {
      return res.status(404).json({ message: "Kbase entry not found" });
    }

    res.json({ message: "Kbase entry deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Controller to add a new FAQ entry to a specific Kbase entry by title
const addFaqToKbaseByTitle = async (req, res) => {
  try {
    const { title, faq } = req.body;

    // Find the Kbase entry by title in the database
    const kbase = await Kbase.findOne({ title });

    if (!kbase) {
      return res.status(404).json({ message: "Kbase entry not found" });
    }

    // Add the new FAQ entry to the Kbase entry
    kbase.faq.push(faq);
    await kbase.save();

    // res.status(201).json({ message: "FAQ added successfully" });

    res.status(201).json(kbase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createKbase,
  getAllKbases,
  deleteKbaseByTitle,
  addFaqToKbaseByTitle,
};
