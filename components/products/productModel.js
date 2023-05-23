const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    meal: { type: String },
    power: { type: Number, default: 0 },
    image: { type: String, default: null },
    distribute: { type: String }, 
    elements: [ 
        { type: String, default: null } 
    ],
    sizes: [{
        size: { type: String, default: null },
        cost: { type: Number, default: 0 }
    }],
    sidedishs: [{
        dish: { type: String, default: null },
        cost: { type: Number, default: 0 },
    }],
    sold: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'category' }, // khóa ngoại
    createAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('product', productSchema);