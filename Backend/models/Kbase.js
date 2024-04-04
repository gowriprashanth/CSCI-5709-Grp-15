const mongoose = require("mongoose");

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

const Kbase = mongoose.model("Kbase", KbaseSchema);

module.exports = Kbase;
