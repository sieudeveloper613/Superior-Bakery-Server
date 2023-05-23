const mongoose = require('mongoose');
const Schema = mongoose.Schema

const introductionSchema = new Schema({
    title: { type: String },
    label: { type: String },
    content: { type: String },
})

module.exports = mongoose.model('introduction', introductionSchema)