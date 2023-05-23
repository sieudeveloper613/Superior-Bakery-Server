// map với database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const usersSchema = new Schema({
    // id: { type: ObjectId },
    email : { type: String, unique: true },
    fullname : { type: String },
    phone: { type: String },
    password: { type: String },
    gender: { type: Number, default: 0 },
    avatar: { type: String, default: null },
    locations: [{
        address: { type: String },
        ward: { type: String },
        district: { type: String },
        city: { type: String },
        type: { type: Number, default: 0 },
        typeName: { type: String },
    }],
    customerType: { type: String, default: 'Khách hàng mới' },
    rank: { type: String, default: 'Thông thường' },
    orderInformation: {
        paying: { type: Number, default: 0 },
        bill: { type: Number, default: 0 },
        product: { type: Number, default: 0 },
    },
    loginCount: { type: Number, default: 0 },

});

module.exports = mongoose.model('users', usersSchema);