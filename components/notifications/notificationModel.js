const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    isView = 1: viewed,
    isView = 0: unview,
*/
const notificationSchema = new Schema({
    title: { type: String },
    content: { type: String },
    url: { type: String, default: null },
    type: { type: String, default: 'event'},
    image: { type: String, default: null },
    isView: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('notification', notificationSchema);