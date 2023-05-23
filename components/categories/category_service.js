const categoryModel = require('./category_model')

const getCategories = async () => {
  try {
    const get = await categoryModel.find({});
    return get;
  } catch (error) {
    throw new Error(error);
  }
    
}

const insertCategory = async ( type, name, image ) => {
  try {
    const insert = new categoryModel({ type, name, image });
    return insert.save();
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getCategories, insertCategory };


