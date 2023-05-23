

const userService = require('./user_service');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (email, fullname, phone, password) => {
    try {
        const check = await userService.checkEmail(email);
        if(check) {
            throw new Error('Email đã tồn tại');
        } else {
            // hash password before storing database
            const hashPassword = bcryptjs.hashSync(password, 10);
            return await userService.signUp(email, fullname, phone, hashPassword);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.signIn = async (email, password) => {
    try {
        const user = await userService.signIn(email);
        if (user) {
            const check = bcryptjs.compareSync(password, user.password);
            if (check) {
                // create 'token' with username is id of user
                const token = jwt.sign({ username: user.username, _id: user._id}, 
                                        'secret', { expiresIn: 30 * 24 * 60 * 60 });
                // create 'refresh token 90 days'
                return token;
            } else {
                throw new Error('Sign In is incorrect!');
            }
        } else {
            throw new Error('Sign In is incorrect!');
        }
    } catch (error) {
        throw new Error(error.message || 'Having an Error!');
    }
}

exports.getInfo = async (email) => {
    try {
        return await userService.getInfo(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.changePassword = async (email, oldPassword, newPassword) => {
    try {
        let currentPassword = await userService.currentPassword(email);
        console.log('get-current: ', currentPassword, oldPassword)
        if(oldPassword){
            let isMatch = await bcryptjs.compare(oldPassword, currentPassword)
            if( !isMatch ) {
                throw new Error('Mật khẩu cũ không chính xác');
            } else {
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(newPassword, salt);
                // this.password = hashedPassword;
                // await this.save();
                const change = await userService.changePassword(email, hashedPassword);
                console.log('on-change: ', change)
                return change;
            }
        } else {
            return new Error('Mật khẩu cũ không được để trống')
        }
        
    } catch (error) {
        console.error('Lỗi đổi mật khẩu', error)
    }
}

exports.updateInfo = async (id, fullname, phone) => {
    try {
        const update = await userService.updateInfo(id, fullname, phone);
        if(!id || !fullname || !phone) {
            throw new Error('Fields are not empty!');
        } else {
            return update;
        }
    } catch (error) {
        console.error('update-info-error: ', error);
    }
}

exports.insertAddress = async (id, location) => {
    try {
        if(!id) {
            throw new Error('id is not match or exist')
        } else {
            console.log('controll-location: ', id, location)
            const insert = await userService.insertAddress(id, location);
            console.log('controll-insert: ', insert)
            return insert;
        }
    } catch (error) {
        console.error('insert-address-error: ', error);   
    }
};

exports.removeAddressById = async (id, idAddress) => {
    try {
        console.log('controller-params: ', id, idAddress);
        if ( id ) {
            const remove = await userService.removeAddressById(id, idAddress);
            console.log('controller-remove: ', remove);
            if ( remove ) {
                return remove;
            } else {
                return new Error('Something is wrong!')
            }
        } else {
            return new Error('User ID is not match or exist!')
        }
    } catch (error) {
        console.error('remove-address-error: ', error);
    }
}

exports.collectAddressById = async (id) => {
    try {
        console.log('controller-params: ', id);
        if ( id ) {
            const collect = await userService.collectAddress(id);
            console.log('controller-collect: ', collect);
            if ( collect ) {
                return collect;
            } else {
                return new Error('Something is wrong!')
            }
        } else {
            return new Error('User ID is not match or exist!')
        }
    } catch (error) {
        console.error('collect-address-error: ', error);
    }
}

exports.updateAddressById = async (id, idAddress, location) => {
    try {
        console.log('controller-params: ', id);
        if ( id ) {
            const update = await userService.updateAddressById(id, idAddress, location);
            console.log('controller-update: ', update);
            if ( update ) {
                return update;
            } else {
                return new Error('Something is wrong!')
            }
        } else {
            return new Error('User ID is not match or exist!')
        }
    } catch (error) {
        console.error('update-address-error: ', error);
    }
}

exports.updateAvatarById = async (id, avatar) => {
    try {
        console.log('update-avatar-params: ', id, avatar);
        if (id) {
            const update = await userService.updateImageById(id, avatar);
            return update;
        } else {
            return new Error('User ID not found!')
        }
    } catch (error) {
        console.error('update-avatar-by-id-controller-error: ', error);
    }
}