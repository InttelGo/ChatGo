const mongoose = require("mongoose");


const RedirectionSchema = new mongoose.Schema({
    de: { type: Number, required: true },
    para: { type: Number, required: true },
    motivo: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("redirection", RedirectionSchema);