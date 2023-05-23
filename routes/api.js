const { request } = require('express');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../components/users/user_controller');
const introductionController = require('../components/introductions/introduction_controller');
const categoriesController = require('../components/categories/category_controller');
const storeController = require('../components/stores/storeController');
const notificationController = require('../components/notifications/notificationController');
const productController = require('../components/products/productController');
const authen = require('../middleware/authen');
const middleware = require('../middleware/upload');


// --- FOR CLIENT ---
router.post("/signUp", async function(req, res, next){
   try {
        const { email, fullname, phone, password } = req.body;
        const user = await userController.signUp( email, fullname, phone, password );
        console.log('Register-success: ', user);
        res.status(200).json({isSuccess: 1, user: user});
   } catch (error){
     if (error.message === "Email đã tồn tại") {
          res.status(409).json({ error: error.message });
        } else {
          console.log('err: ', error, typeof error)
          res.status(500).json({ error });
        }
    
   }
});

// --- FOR CLIENT ---
router.post('/signIn', async function(req, res, next){
    try {
         const { email, password } = req.body;
         const token = await userController.signIn(email, password);
         res.status(200).json({isSuccess: 1, token});
    } catch (error){
         res.status(500).json({ isSuccess: 0 });
    }
 });

// --- FOR CLIENT ---
router.post('/change-password', async function(req, res, next){
     try {
          const { email, oldPassword, newPassword } = req.body;
          const onHandle = await userController.changePassword(email, oldPassword, newPassword);
          if ( onHandle ) {
               res.status(200).json({ isSuccess: 1, message: 'Change password successfull!' });
               return onHandle
          } else {
               res.status(200).json({ isSuccess: 2, message: 'Current password is wrong' });
          }
     } catch (error){
          res.status(500).json({ isSuccess: 0, message: 'Modify password failed' });
     }
  });

// --- FOR CLIENT ---
router.post('/user-info', async function(req, res, next){
     try {
          const { email } = req.body;
          console.log('get-email: ', email)
          const user = await userController.getInfo(email);
          res.status(200).json(user);
     } catch (error) {
          res.status(501).json({ error: error })
     }
 });

// --- FOR CLIENT ---
router.post('/update-info', async function(req, res, next){
     try {
          const { id, fullname, phone } = req.body;
          console.log('params-update-info: ', id, fullname, phone);
          const onUpdate = await userController.updateInfo(id, fullname, phone);
          if( onUpdate ) {
               res.status(200).json({ isSuccess: 1, user: onUpdate })
          } else {
               res.status(200).json({ isSuccess: 0, message: 'update failed' })
          }
     } catch (error) {
          res.status(500).json({ error: error })
     }
})

router.post('/update-avatar', [middleware.single('image')], async function(req, res, next) {
     try {
          const { file } = req;
          const { id } = req.body;
          console.log('update-avatar-params: ', file, id);
          // delete body.avatar;
          if (!file) {
               return res.status(400).json({
                 isSuccess: 0,
                 message: 'No image file provided'
               });
             }
             
             const imageUrl = `http://192.168.0.112:3000/images/${file.filename}`;
             const onUpdate = await userController.updateAvatarById(id, imageUrl);

          if (onUpdate) {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'Update avatar successful!'
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'Update avatar failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: error })
     }
})

// --- FOR CLIENT ---
router.post('/insert-address', async function(req, res, next){
     try {
          const { id, address, ward, district, city, type, typeName } = req.body;
          console.log('item: ', address, ward, district, city, type, typeName)
          const locations = {
               address: address,
               ward: ward,
               district: district,
               city: city,
               type: type || 0,
               typeName: typeName || null,
          };
          const onInsert = await userController.insertAddress(id, locations);
          console.log('onInsert: ', onInsert)
          if (onInsert) {
               return res.status(200).json({
                    isSuccess: 1,
                    message: 'Thêm địa chỉ mới thành công',
               });
          } else {
               return res.status(200).json({
                    isSuccess: 0,
                    message: 'Thêm địa chỉ mới thất bại',
               });
          }
     } catch (error) {
          res.status(500).json({ error: error })
     }
})

// --- FOR CLIENT ---
router.post('/remove-address-by-id', async function(req, res, next){
     try {
          const { id, idAddress } = req.body;
          console.log('params: ', id, idAddress);
          const onRemove = await userController.removeAddressById(id, idAddress);
          if ( onRemove ) {
               return res.status(200).json({
                    isSuccess: 1,
                    message: 'Xóa địa chỉ thành công',
               })
          } else {
               return res.status(200).json({
                    isSuccess: 0,
                    message: 'Xóa địa chỉ thất bại'
               })
          }
     } catch (error) {
          res.status(500).json({ error: "Undefined error"})
     }
});

// --- FOR CLIENT ---
router.get('/collect-address-by-id', async function(req, res, next){
     try {
          // query ...?_id=123
          // params .../123
          const { id } = req.query;
          console.log('params: ', id);
          const onCollect = await userController.collectAddressById(id);
          if( onCollect ) {
               res.status(200).json({
                    isSuccess: 1,
                    locations: onCollect,
               })
          } else {
               return new Error('collect address failed!')
          }
     } catch (error) {
          res.status(500).json({ error })
     }
});

// --- FOR CLIENT ---
router.post('/update-address-by-id', async function(req, res, next){
     try {
          const { id, idAddress, address, ward, district, city, type, typeName } = req.body;
          console.log('params: ', id, idAddress, address, ward, district, city, type, typeName)
          const locations = {
               address: address,
               ward: ward,
               district: district,
               city: city,
               type: type || 0,
               typeName: typeName || null,
          };
          // const array = [locations];
          // console.log('params: ', id, locations)
          
          const onUpdate = await userController.updateAddressById(id, idAddress, locations);
          console.log('onUpdate: ', onUpdate)
          if (onUpdate) {
               return res.status(200).json({
               isSuccess: 1,
               message: 'Thay đổi địa chỉ mới thành công',
               });
          } else {
               return res.status(500).json({
               isSuccess: 0,
               message: 'Thay đổi địa chỉ mới thất bại',
               });
          }
     } catch (error) {
          res.status(500).json({ error: 'Undifined Error' })
     }
})

// --- FOR CLIENT ---
router.get('/introduction', async function(req, res, next) {
     try {
          const get = await introductionController.getIntroduction();
          res.status(200).json({ introduction: get })
     } catch (error) {
          res.status(400).json({ error })
     }
})

// --- FOR SEVER ---
router.post('/introduction', async function(req, res, next){
     try {
          const { title, label, content } = req.body;
          console.log('params-insert-intro: ', title, label, content);
          const insert = await introductionController.insertIntroduction( title, label, content );
          res.status(200).json({ insert })
     } catch (error) {
          res.status(500).json({ error, message: 'insert failed' })
     }
})

// --- FOR CLIENT AND SEVER ---
router.get('/category', async function(req, res, next){
     try {
          const get = await categoriesController.getCategories();
          console.log('get-category-list: ', get);
          res.status(200).json({ categories: get })
     } catch (error) {
          res.status(500).json({ error: 'Get categories falied'})
     }
});

// --- FOR SEVER ---
router.post('/category', async function(req, res, next){
     try {
          const { type, name, image } = req.body;
          console.log('params-insert-category: ', type, name, image);

          const insert = await categoriesController.insertCategory(type, name, image);
          console.log('insert result:', insert);

          if (insert) {
               res.status(200).json({ category: insert })
          } else {
               res.status(500).json({ error: 'insert new category failed!' })
          }
     } catch (error) {
          console.error('error:', error);
          res.status(500).json({ error: 'insert new category failed!' })
     }
});

// --- FOR SEVER ---
router.post('/insert-store', async function(req, res, next){
     try {
          const { branch, name, ward, address, latitude, longtitude, image } = req.body;
          console.log('params: ', branch, name, ward, address, latitude, longtitude, image)
          const location = {
               latitude: latitude,
               longtitude: longtitude,
          }

          const onInsert = await storeController.insertStore( branch, name, ward, address, location, image );
          if( onInsert ) {
               res.status(200).json({
                    isSuccess: 1,
                    store: onInsert,
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'insert store failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'insert store failed!' })
     }
});

// --- FOR CLIENT AND SEVER ---
router.get('/collect-store', async function(req, res, next){
     try {
          const onCollect = await storeController.collectStore();
          if( onCollect ) {
               res.status(200).json({
                    isSuccess: 1,
                    store: onCollect,
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'collect store failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'collect store failed!' })
     }
});

// --- FOR SEVER ---
router.post('/update-store', async function(req, res, next){
     try {
          const {id, branch, name, ward, address, latitude, longtitude, image } = req.body;
          console.log('params: ', id, branch, name, ward, address, latitude, longtitude, image)
          const location = {
               latitude: latitude,
               longtitude: longtitude,
          }

          const onUpdate = await storeController.updateStore( id, branch, name, ward, address, location, image);
          if( onUpdate ) {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'update store successful!'
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'update store failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'update store failed!' })
     }
});

// --- FOR SEVER ---
router.get('/remove-store', async function(req, res, next){
     try {
          const { id } = req.query
          const onRemove = await storeController.removeStore(id);
          if( onRemove ) {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'remove store successful!'
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'remove store failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'remove store failed!' })
     }
});

// --- FOR SEVER ---
// router.post('/post-notification-to-all', async function (req, res, next) {
//      try {
//           const { title, content, url, isAll, image} = req.body;
//           const onPost = await notificationController.insertNotification(title, content, url, isAll, image);
//           if( onPost ) {
//                res.status(200).json({
//                     isSuccess: 1,
//                     notification: onPost,
//                })
//           } else {
//                res.status(200).json({
//                     isSuccess: 0,
//                     message: 'Post notification to all failed'
//                })
//           }
//      } catch (error) {
//           res.status(500).json({ error: 'Post notification to all failed!'})
//      }
// })

// --- FOR SEVER ---
router.post('/post-notification', async function(req, res, next) {
     try {
          const { title, content, url, type, image } = req.body;
          // const notification = {
          //      title: title,
          //      content: content,
          //      url: url,
          //      type: type || 'event',
          //      image: image || null,
          // }
          const onInsert = await notificationController.insertNotification(title, content, url, type, image)
          if (onInsert) {
               res.status(200).json({
                    isSuccess: 1,
                    notifications: onInsert
               })
          } else {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'Post notification to all failed!'
               })
          }
     } catch (error) {
          res.status(500),json({ error: 'Post notification to all failed!'})
     }
})

// --- FOR SEVER ---
router.post('/post-notification-to-person', async function (req, res, next) {
     try {
          const {userId, title, content, url, type, image} = req.body;
          const onPost = await notificationController.insertNotificationToPerson(userId, title, content, url, type, image);
          if( onPost ) {
               res.status(200).json({
                    isSuccess: 1,
                    notification: onPost,
               })
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'Post notification to person failed'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'Post notification to person failed!'})
     }
});

router.get('/collect-notification', async function(req, res, next) {
     try {
          const onCollect = await notificationController.collectNotification();
          if (onCollect) {
               res.status(200).json({
                    isSuccess: 1,
                    notifications: onCollect,
               })
          } else {
               res.status(201).json({
                    isSuccess: 0,
                    message: 'Collect notifications failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'Collect notifications failed!'})
     }
});

router.post('/update-view-notification', async function(req, res, next){
     try {
          const { userId, notificationId } = req.body;
          console.log('update-view-params: ', userId, notificationId)
          if (userId || notificationId) {
               const onUpdate = await notificationController.updateViewNotification(userId, notificationId);
               if (onUpdate) {
                    res.status(200).json({
                         isSuccess: 1,
                         message: 'Update view of notification successful!'
                    })
               } else {
                    res.status(200).json({
                         isSuccess: 0,
                         message: 'Update view of notification failed!'
                    })
               }
          } else {
               res.status(400).json({
                    isSuccess: -1,
                    message: 'User id or notification id is empty!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'Update view of notification error'})
     }
})

// --- FOR CLIENT AND SEVER ---
router.get('/collect-product', async function(req, res, next){
     try {
          const onCollect = await productController.collectProducts();
          if (onCollect) {
               res.status(200).json({
                    isSuccess: 1,
                    products: onCollect
               });
          } else {
               res.status(200).json({
                    isSuccess: 0,
                    message: 'Collect lots of products failed!'
               }); 
          }
     } catch (error) {
          res.status(501).json({ error });
     }
});

// --- FOR SEVER ---
router.post('/insert-product', [middleware.single('image')], async function(req, res, next){
     try {
          const { file } = req;
          const { name, price, meal, power, distribute, elements, sidedishs, sizes, category } = req.body;
          console.log('params: ', file, name, price, meal, power, distribute, category)
          console.log('element-arr: ', elements);
          console.log('sidedishs-arr: ', sidedishs);
          console.log('sizes-arr: ', sizes);
          // const { id } = req.body;
          // console.log('update-avatar-params: ', file, id);
          // // delete body.avatar;
          if (!file) {
               return res.status(400).json({
                 isSuccess: 0,
                 message: 'No image file provided'
               });
             }
             
             const imageUrl = `http://192.168.0.112:3000/images/${file.filename}`;
          //    const onUpdate = await userController.updateAvatarById(id, imageUrl);

          const product = {
               name: name,
               price: price,
               meal: meal,
               power: power,
               image: imageUrl || null,
               distribute: distribute,
               elements: elements ? elements : [],
               sidedishs: sidedishs ? sidedishs : [],
               sizes: sizes ? sizes : [],
               category: category
          };

          const onInsert = await productController.insertProduct(product);
          if (onInsert) {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'Insert new product successful!',
                    product: onInsert
               });
          } else {
               res.status(401).json({
                    isSuccess: 0,
                    message: 'Insert products failed!'
               }); 
          }
     } catch (error) {
          console.error('error: ', error)
          res.status(501).json({ error: error });
     }
});

// --- FOR SEVER ---
router.post('/update-product', [middleware.single('image')], async function(req, res, next) {
     try {
          const { file } = req;
          const { id, name, price, meal, power, distribute, elements, sidedishs, sizes, category } = req.body;
          console.log('params: ', file, name, price, meal, power, distribute, category)
          console.log('element-arr: ', elements);
          console.log('sidedishs-arr: ', sidedishs);
          console.log('sizes-arr: ', sizes);

          if (!file) {
               return res.status(400).json({
                 isSuccess: 0,
                 message: 'No image file provided'
               });
             }
             
          const imageUrl = `http://192.168.0.112:3000/images/${file.filename}`;

          const product = {
               name: name,
               price: price,
               meal: meal,
               power: power,
               image: imageUrl || null,
               distribute: distribute,
               elements: elements ? elements : [],
               sidedishs: sidedishs ? sidedishs : [],
               sizes: sizes ? sizes : [],
               category: category
          };
          const onUpdate = await productController.updateProduct(id, product);
          if (onUpdate) {
               res.status(200).json({
                    isSuccess: 1,
                    message: `Update current product ${id} successful!`,
                    product: onUpdate
               });
          } else {
               res.status(401).json({
                    isSuccess: 0,
                    message: 'Update product by id failed!'
               }); 
          }
     } catch (error) {
          res.status(500).json({ error: 'Update product by id failed!'})
     }
});

// --- FOR CLIENT AND SEVER ---
router.get('/collect-product-by-id/:id', async function(req, res, next) {
     try {
          const { id } = req.params;
          const onCollect = await productController.collectProductById(id);
          if (onCollect) {
               res.status(200).json({
                    isSuccess: 1,
                    products: onCollect
               })
          } else {
               res.status(201).json({
                    isSuccess: 0,
                    message: 'Collect product by id failed!'
               })
          }
     } catch (error) {
          res.status(500).json('Collect product by id failed!')
     }
});

// --- FOR CLIENT AND SEVER ---
router.get('/collect-product-by-category', async function(req, res, next) {
     try {
          const { idCategory } = req.query;
          const onCollect = await productController.collectProductsByCategory(idCategory);
          if (onCollect) {
               res.status(200).json({
                    isSuccess: 1,
                    products: onCollect
               })
          } else {
               res.status(201).json({
                    isSuccess: 0,
                    message: 'Collect product by category failed!'
               })
          }
     } catch (error) {
          res.status(500).json('Collect product by category failed!')
     }
});

// --- FOR SEVER ---
router.get('/remove-product', async function(req, res, next){
     try {
          const { id } = req.query;
          const onRemove = await productController.removeProduct(id);
          if (onRemove) {
               res.status(200).json({
                    isSuccess: 1,
                    message: 'Remove product by id successful!'
               })
          } else {
               res.status(201).json({
                    isSuccess: 0,
                    message: 'remove product by id failed!'
               })
          }
     } catch (error) {
          res.status(500).json({ error: 'remove product by id failed!'})
     }
})



module.exports = router;