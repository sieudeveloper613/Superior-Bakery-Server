
const categoryService = require('./category_service');

const getCategories = async () => {
    try {
        const get = await categoryService.getCategories();
        return get;
    } catch (error) {
        throw new Error(error)
    }
}

const insertCategory = async ( type, name, image ) => {
    try {
        if( type, name, image ) {
            const insert = await categoryService.insertCategory( type, name, image );
            return insert;
        } else {
            throw new Error('insert fields failed!')
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getCategories, insertCategory };