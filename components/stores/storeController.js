const storeService = require('./storeService');

exports.insertStore = async ( branch, name, ward, address, location, image ) => {
    try {
        if ( ( branch && name && ward && address && location ) || image ) {
            const insert = await storeService.insertStore( branch, name, ward, address, location, image );
            return insert;
        } else {
            return new Error('Fields are not empty!')
        }
    } catch (error) {
        console.error('insert-controller-error: ', error);
    }
};

exports.collectStore = async () => {
    try {
        const collect = await storeService.collectStore();
        return collect;
    } catch (error) {
        console.log('collect-controller-service: ', error);
    }
};

exports.updateStore = async ( id, branch, name, ward, address, location, image ) => {
    try {
        if ( id ) {
            if ( ( branch && name && ward && address && location ) || image ) {
                const update = await storeService.updateStore(
                    id, branch, name, ward, address, location, image,
                )
                return update;
            } else {
                return new Error('Fields are not empty!')
            }
        } else {
            return new Error('Id not found')
        }
    } catch (error) {
        console.error('update-controller-error: ', error);
    }
}

exports.removeStore = async ( id ) => {
    try {
        if( id ) {
            const remove = await storeService.removeStore(id);
            return remove;
        } else {
            return new Error('Id not found!')
        }
    } catch (error) {
        console.error('remove-controller-error: ', error);
    }
}