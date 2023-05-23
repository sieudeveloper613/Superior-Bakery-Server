
const productService = require('./productService');
const categoryService = require('../categories/category_service');

const collectProducts = async () => {
    try {
        const collect = await productService.collectProduct();
        if ( collect ) {
            return collect;
        } else {
            return new Error('')
        }
    } catch (error) {
        console.error('collect-products-controller-error: ', error);
    }
}

// const collectProductsByCategory = async (categoryId) => {
//     try {
//         const product = await productService.getById(id);
//         let categories = await categoryService.getCategories();
//         categories = categories.map(category => {
//             let c = {
//                 _id: category._id,
//                 type: category.type,
//                 name: category.name,
//                 isSelected: false,
//             }
//             // category = {...category, isSelected: false};
//             if(product.category.toString() == c._id.toString()){
//                 c.isSelected = true;
//             }
//             return c;
//         });
//         console.log(product, categories);
//         return { product, categories};
//     } catch (error) {
//         console.error('collect-by-category-controller-error: ', error);
//     }
// }

const collectProductsByCategory = async (categoryId) => {
    try {
        if (categoryId) {
            const collect = await productService.collectProductByCategory(categoryId);
            return collect;
        } else {
            return new Error(' Category ID not found!')
        }
    } catch (error) {
        console.error('collect-by-category-controller-error: ', error);
    }
}

const collectProductById = async (id) => {
    try {
        if (id) {
            const collect = await productService.collectProductById(id);
            return collect;
        } else {
            return new Error('Product ID not found!')
        }
    } catch (error) {
        console.error('collect-product-by-id-controller-error: ', error)
    }
}

const insertProduct = async (product) => {
    try {
      console.log('insert-controller: ', product)
      if (product) {
        const elements = product.elements.map((item) => (item));
        const sidedishs = product.sidedishs.map(item => ({ dish: item.dish, cost: item.cost }))
        const sizes = product.sizes.map((item) => ({ size: item.size, cost: item.cost }))
        const insert = await productService.insertProduct({ ...product, elements, sizes, sidedishs });
        return insert;
      } else {
        return new Error('product fields can not be empty!')
      }
    } catch (error) {
      console.error('insert-controller-error: ', error);
    }
  }

const updateProduct = async (id, product) => {
    try {
        if (id) {
            if (product) {
                const update = await productService.updateProduct(id, product);
                return update;
            } else {
                return new Error('Product fields can empty!')
            }
        } else {
            return new Error('Product ID not found!')
        }
        
    } catch (error) {
        console.error('update-controller-error: ', error);
    }
}

const removeProduct = async (id) => {
    try {
        if (id) {
            const remove = await productService.removeProduct(id);
            return remove;
        } else {
            return new Error('Product Id not found!')
        }
    } catch (error) {
        console.error('remove-controller-error: ', error);
    }
}



module.exports = {
    collectProducts,
    collectProductById,
    collectProductsByCategory,
    insertProduct,
    updateProduct,
    removeProduct
};


