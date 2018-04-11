const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["audio", "text"]
    },
    input: {
        required: true,
        type: Object
    }
});

module.exports = mongoose.model("Question", questionSchema);
