

const productModel = require('./productModel')

const collectProduct = async () => {
  try {
    const items = await productModel.find({})
    return items;
  } catch (error) {
    console.error('collect-service-error: ', error);    
  }
}

const collectProductByCategory = async (idCategory) => {
  try {
    const products = await productModel.find({ category: idCategory }).populate('category');
    return products;
  } catch (error) {
    console.error('collect-product-by-category-service-error: ', error);
  }
}

const collectProductById = async (id) => { 
    try {
      const collect = await productModel.findById(id);
      return collect;
    } catch (error) {
      console.error('collect-by-id-service-error: ', error);
    }
}
// const p = {
    //   name: product.name,
    //   price: product.price,
    //   quantity: product.quantity,
    //   image: product.image,
    //   category: product.category,
    // }
    // products.push(p);
const insertProduct = async (product) => {
  try {
    console.log('insert-service-product: ', product);
    const insert = new productModel(product);
    return await insert.save();
  } catch (error) {
    console.error('insert-service-error: ', error) 
  }
}
    

const updateProduct = async (id, product) => {
  // const p = products.find(p => p._id.toString() == id.toString());
  // p.name = product.name;
  // p.price = product.price;
  // p.quantity = product.quantity;
  // p.category = product.category;
  // if it's new image get new image, get old image instead
  // p.image = product.image ? product.image : p.image;
  try {
    if(!product.image){
      delete product.image;
    }
    const update = await productModel.findByIdAndUpdate(id, product);
    return update;
  } catch (error) {
    console.error('update-service-error: ', error);
  }
}

const removeProduct = async (id) => {
  try {
    const remove = await productModel.findByIdAndDelete(id);
    return remove;
  } catch (error) {
    console.error('remove-service-error: ', error);
  }
}

module.exports = {
  collectProduct,
  collectProductById,
  insertProduct,
  updateProduct,
  removeProduct,
  collectProductByCategory
};


