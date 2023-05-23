const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//          store: 'Chi nhánh 1',
//         name: 'Tiệm bánh mì Superior',
//         ward: 'Quận 1',
//         label: 'Chi nhánh 1 (quận 1)',
//         address: '123 Nguyễn Văn A, Phường B, Quận C, Thành phố D',
//         location: {
//           latitude: '00000',
//           longtitude: '0000'
//         },
//         image: images.SUPERIOR_LOGO

const storeSchema = new Schema({
        branch: { type: String },
        name: { type: String, default: 'Tiệm bánh mì Superior'},
        ward: { type: String },
        address: { type: String },
        location: {
          latitude: { type: String },
          longtitude: { type: String },
        },
        image: { type: String, default: null },
})

module.exports = mongoose.model('store', storeSchema)