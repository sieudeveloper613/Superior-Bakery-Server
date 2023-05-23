const notificationService = require('./notificationService');

exports.insertNotification = async ( title, content, url, type, image ) => {
    try {
        if( (title && content) || url || type || image ) {
            const insert = await notificationService.insertNotification(title, content, url, type, image);
            if( insert ) {
                return insert;
            } else {
                return new Error('post noti to all on controller failed!');
            }
        } else {
            return new Error('Fields are not empty!');
        }
    } catch (error) {
        console.error('insert-controller-error: ', error);
    }
};

// exports.insertNotification = async (notification) => {
//     try {
//         if(notification) {
//             const insert = await notificationService.insertNotification(notification);
//             return insert;
//         } else {
//             return new Error('Notification fields not found!')
//         }
//     } catch (error) {
//         console.error('insert-notification-controller-error: ', error);
//     }
// }

exports.insertNotificationToPerson = async ( userId, title, content, url, type, image ) => {
    try {
        if ( userId ) {
            if( (title && content) || url || type || image ) {
                const insert = await notificationService.insertNotificationToPerson(userId, title, content, url, type, image);
                if( insert ) {
                    return insert;
                } else {
                    return new Error('post noti to person on controller failed!');
                }
            } else {
                return new Error('Fields are not empty!');
            }
        } else {
            return new Error(' UserId not found!');
        }
    } catch (error) {
        console.error('insert-to-person-controller-error: ', error);
    }
};

exports.collectNotification = async () => {
    try {
        const collect = await notificationService.collectNotification();
        return collect;
    } catch (error) {
        console.error('collect-notification-controller-error: ', error);
    }
}

exports.updateViewNotification = async (userId, notificationId) => {
    try {
        if (userId) {
            const update = await notificationService.updateViewNotification(userId, notificationId);
            return update;
        } else {
            return new Error('User Id not found!')
        }
    } catch (error) {
        console.error('update-view-notification-controller-error: ', error);
    }
}