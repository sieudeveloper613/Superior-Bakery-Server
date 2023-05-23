const storeModel = require('./storeModel');

exports.insertStore = async (
    branch, name, ward, address, location, image
) => {
    try {
        const insert = new storeModel({ branch, name, ward, address, location, image });
        return await insert.save();
    } catch (error) {
        console.error('insert-service-error: ', error);
    }
}

exports.collectStore = async () => {
    try {
        const collect = await storeModel.find({});
        return collect;
    } catch (error) {
        console.error('collect-service-error: ', error)
    }
}

exports.updateStore = async ( id, branch, name, ward, address, location, image ) => {
    try {
        const update = await storeModel.findOneAndUpdate(
            { _id: id },
            { $set: {
                branch: branch,
                name: name,
                ward: ward,
                address: address,
                location: location,
                image: image,
            }},
            { new : true }
        );
        return update;
    } catch (error) {
        console.error('update-service-error: ', error);
    }
}

exports.removeStore = async ( id ) => {
    try {
        const remove = await storeModel.findByIdAndRemove({ _id: id })
        return remove;
    } catch (error) {   
        console.log('remove-service-error: ', error);
    }
}