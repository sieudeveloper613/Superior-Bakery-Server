// service là nơi mình sẽ tương tác với database
// tương tác với bảng của nó trong database
// theo nguyên tắc KHÔNG ĐƯỢC GỌI SERVICE NÀY GỌI SERVICE kia

const usersModel = require('./user_model');
const bcrypt = require('bcryptjs');

exports.signIn = async (email) => {
    try {
        let user = await usersModel.find({ email });
        if(user.length > 0){
            return user[0];
        }        
        return null;
    } catch (error) {
        console.log('Đã xảy ra lỗi đăng nhập!')
    }
}

exports.signUp = async ( email, fullname, phone, password ) => {
    const user = new usersModel({ email, fullname, phone, password });
    return await user.save();
}

exports.checkEmail = async (email) => {
    try {
        let existingUser  = await usersModel.findOne({ email });
        if(!existingUser){
            return true;
        }
        return false;
    } catch (error) {
        throw new Error('Having an Error!');
    }
}

exports.currentPassword = async (email) => {
    let existingPassword = await usersModel.findOne({ email });
    if(existingPassword){
        return existingPassword.password;
    } else {
        console.error('Email không hợp lệ!')
        return 0
    }
}

exports.changePassword = async (email, password) => {
    try {
      const user = await usersModel.findOne({ email });
      if (user) {
        const change = await usersModel.findOneAndUpdate(
          { email },
          { $set: { password: password } },
          { new: true }
        );
        return change;
      } else {
        throw new Error('Người dùng không tồn tại');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Lỗi đổi mật khẩu');
    }
  }

exports.getInfo = async (email) => {
    try {
        const user = await usersModel.findOne({ email });
        return user;
      } catch (err) {
        console.error(err);
        return { error: 'Error fetching user data' };
      }
}

exports.updateInfo = async (id, fullname, phone) => {
  const update = await usersModel.findByIdAndUpdate(
    { _id: id },
    { $set: {
     fullname: fullname,
     phone: phone, 
    }},
    { new: true }
  )
  return update;
}

exports.insertAddress = async (id, location) => {
  try {
    console.log('get-location: ', location)
    const result = await usersModel.updateOne(
      { _id: id },
      { $push: { locations: location } }
    );
    console.log('get-result: ', result)
    return result.modifiedCount === 1 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.removeAddressById = async (id, idAddress) => {
  try {
    const remove = await usersModel.findByIdAndUpdate(
      id,
      {
        $pull: { locations: { _id: idAddress } }
      },
      { new: true }
    );

    return remove;
  } catch (error) {
    console.error(error);
    throw error;
  }   
}

exports.collectAddress = async (id) => {
  try {
    const user = await usersModel.findById(id);
    if (user) {
      const locations = user.locations;
      console.log('service-address: ', locations);
      return locations;
    }
  } catch (error) {
    console.error(error);
  }   
}

// exports.updateAddressById = async (id, idAddress, location) => {
//   try {
//     const user = await usersModel.findById({ _id: id });
//     if ( user ) {
//       const update = await usersModel.findByIdAndUpdate(
//         { _id: idAddress },
//         { $set: { locations: location }},
//         { new: true }
//       )
//       return update;
//     }
//   } catch (error) {
//     console.error('service-error: ', error);
//   }
// }

exports.updateAddressById = async (id, idAddress, location) => {
  try {
    const user = await usersModel.findById(id);
    if (user) {
      const address = user.locations.find(addr => addr._id == idAddress);
      if (address) {
        address.address = location.address;
        address.ward = location.ward;
        address.district = location.district;
        address.city = location.city;
        address.type = location.type || 0;
        address.typeName = location.typeName || null;

        const updateUser = await user.save();
        return updateUser;
      } else {
        throw new Error('Address not found');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('service-error: ', error);
    throw error;
  }
}

exports.updateImageById = async (id, avatar) => {
  try {
    const update = await usersModel.findByIdAndUpdate(
      { _id: id }, 
      { $set: { avatar: avatar } },
      { new: true },
    )
    console.log('update-image-service: ', update);
    return update
  } catch (error) {
    console.error('update-image-service-error: ', error);
  }
}