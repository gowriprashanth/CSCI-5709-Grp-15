/**
 * @author Dhruvik Kakadiya
 */
const mongoose = require("mongoose");

/**
 * Kbase Model
 * Represents the schema and model for the Kbase collection in the database.
 * Contains a title and an array of FAQs.
 */

// Define the schema for the Kbase collection
const KbaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  faq: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create the Kbase model using the schema
const Kbase = mongoose.model("Kbase", KbaseSchema);

// Export the Kbase model
module.exports = Kbase;
