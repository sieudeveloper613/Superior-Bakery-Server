const introductionService = require('./introduction_service');

const getIntroduction = async () => {
    try {
        const get = await introductionService.getIntroduction();
        console.log('get-intro-list: ', get);
        return get;
    } catch (error) {
        throw new Error(error.message)
    }
}

const insertIntroduction = async (title, label, content ) => {
    try {
        if(title, label, content) {
            const insert = await introductionService.insertIntroduction(title, label, content );
            return insert;
        }
        throw new Error('Field are not empty!')
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateIntroduction = async (id, title, label, content, image) => {
    try {
        return await introductionService.updateIntroduction(id, title, label, content, image);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getIntroduction,
    insertIntroduction,
    updateIntroduction,
}