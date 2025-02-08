import db from "../models";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let userLogin = (email, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let userData = {}
         let isExist = await checkUserEmail(email)
         if (isExist) {
            let user = await db.User.findOne({
               where: { email: email },
               raw: true // console bo di 1 so phan de xoa pass
            })
            if (user) {
               // Kiểm tra mật khẩu (ma da dc hash)
               let check = await bcrypt.compareSync(password, user.password);
               // console.log("check: ", check)
               if (check) {
                  userData.errCode = 0;
                  userData.message = "Đăng nhập thành công";
                  delete user.password;
                  userData.user = user;
               } else {
                  userData.errCode = 3;
                  userData.message = "Mật khẩu không đúng";
               }
            } else {
               userData.errCode = 2;
               userData.message = "Email không tồn tại";
            }
         } else {
            userData.errCode = 1;
            userData.message = "Email của bạn không tồn tại trong hệ thống";
         }
         resolve(userData)
      } catch (e) {
         reject(e)
      }
   })
}

let checkUserEmail = (userEmail) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { email: userEmail }
         })
         if (user) {
            resolve(true)
         } else {
            resolve(false)
         }
      } catch (e) {
         reject(e);
      }
   })
}

let getAllUser = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = '';
         if (userId === 'ALL') {
            users = await db.User.findAll({
               attributes: {
                  exclude: ['password']
               }
            })
         }
         if (userId && userId !== 'ALL') {
            users = await db.User.findOne({
               where: { id: userId },
               attributes: {
                  exclude: ['password']
               }
            })
         }
         resolve(users)
      } catch (e) {
         reject(e);
      }
   })
}

let hashUserPassword = (password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hashPassword = await bcrypt.hashSync(password, salt);
         resolve(hashPassword);
      } catch (e) {
         reject(e)
      }
   })
}

let createNewUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let check = await checkUserEmail(data.email)
         if (check === true) {
            resolve({
               errCode: 1,
               message: "Email của bạn đã được sữ dụng, vui lòng sữ dụng email khác!"
            })
            return
         }
         let hashPasswordFormBcrypt = await hashUserPassword(data.password);
         await db.User.create({
            email: data.email,
            password: hashPasswordFormBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender === "1" ? true : false,
            phoneNumber: data.phoneNumber,
            roleId: data.roleId
         })
         resolve({
            errCode: 0,
            message: "OK",
         })
      } catch (e) {
         reject(e);
      }
   })
}

let deleteUser = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: userId }
         })
         if (!user) {
            resolve({
               errCode: 2,
               message: "Không tìm thấy người dùng",
            })
         }
         await db.User.destroy({
            where: { id: userId }
         })
         resolve({
            errCode: 0,
            message: "Xóa người dùng thành công",
         })
      } catch (e) {
         reject(e);
      }
   })
}

let updateUserData = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.id) {
            resolve({
               errCode: 2,
               message: "Không tìm thấy id người dùng",
            })
         }
         let user = await db.User.findOne({
            where: { id: data.id },
            raw: false
         })
         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save()
            resolve({
               errCode: 0,
               message: "Cập nhật người dùng thành công",
            })
         } else {
            resolve({
               errCode: 1,
               message: "Không tìm thấy người dùng",
            })
         }

      } catch (e) {
         reject(e);
      }
   })
}

module.exports = {
   userLogin: userLogin,
   getAllUser: getAllUser,
   createNewUser: createNewUser,
   deleteUser: deleteUser,
   updateUserData: updateUserData,
}