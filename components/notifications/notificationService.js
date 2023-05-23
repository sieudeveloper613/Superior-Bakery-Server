const notificationModel = require('./notificationModel');
const userModel = require('../users/user_model');

exports.insertNotification = async (title, content, url, type, image) => {
    try {
      const users = await userModel.find({});
      const notifications = [];
  
      for (const user of users) {
        const notification = new notificationModel({
          title,
          content,
          url,
          type,
          image,
          user: user._id
        });
  
        notifications.push(notification);
      }
  
      return await notificationModel.insertMany(notifications);
    } catch (error) {
      console.error('insert-service-error: ', error);
    }
};

// exports.insertNotification = async (notification) => {
//   try {
//     const insert = new notificationModel(notification);
//     return insert.save();
//   } catch (error) {
//     console.error('insert-notification-service-error: ', error);
//   }
// }

exports.insertNotificationToPerson = async (userId, title, content, url, type, image) => {
    try {
        const user = await userModel.findOne({_id: userId});
    
        if (user) {
          const notification = new notificationModel({
            title,
            content,
            url,
            type,
            image,
            user: user._id
          });
    
          return await notification.save();
        } else {
          console.error(`insert-service-error: user with id ${userId} not found`);
        }
      } catch (error) {
        console.error('insert-service-error: ', error);
      }
};

exports.collectNotification = async () => {
  try {
    const collect = await notificationModel.find({});
    return collect;
  } catch (error) {
    console.error('collect-notification-service-error: ', error);
  }
}

exports.updateViewNotification = async (userId, notificationId) => {
  try {
    const onUser = await userModel.findOne({ _id: userId });
    if (onUser) {
      const update = await notificationModel.findByIdAndUpdate(
        { _id: notificationId }, 
        { $set: { isView: true } },
        { new: true }
      );
      return update;
    } else {
      return new Error(`update-view-by-${userId} not found`)
    }
  } catch (error) {
    console.error('update-view-notification-service-error: ', error);
  }
}