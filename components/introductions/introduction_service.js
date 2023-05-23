const introductionModel = require('./introduction_model');

const getIntroduction = async () => {
    const items = await introductionModel.find({});
    return items;
};

const insertIntroduction = async ( title, label, content, image ) => {
    const insert = new introductionModel({ title, label, content, image });
    return insert.save();
};

const updateIntroduction = async (id, title, label, content, image) => {
    const update = await introductionModel.findOneAndUpdate(id, title, label, content, image );
    return update;
}; 

module.exports = {
    getIntroduction,
    insertIntroduction,
    updateIntroduction
}