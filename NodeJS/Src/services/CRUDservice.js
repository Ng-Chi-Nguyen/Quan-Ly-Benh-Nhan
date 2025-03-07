import db from "../models";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
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
         resolve("Đã tạo uẻ thành công")
      } catch (e) {
         reject(e)
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

let getAllUser = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = await db.User.findAll({
            raw: true
         })
         resolve(users)
      } catch (e) {
         reject(e)
      }
   })
}

let getUserInfoById = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: userId },
            raw: true
         })
         if (user) {
            resolve(user)
         } else {
            resolve([])
         }
      } catch (e) {
         reject(e)
      }
   })
}

let updateUserData = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: data.id }
         })
         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            await user.save();
            resolve();
         }
      } catch (e) {
         reject(e)
      }
   })
}

let deleteUserById = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: userId }
         })
         if (user) {
            user.destroy()
         }
         resolve() // return
      } catch (e) {
         reject(e)
      }
   })
}


module.exports = {
   createNewUser: createNewUser,
   getAllUser: getAllUser,
   getUserInfoById: getUserInfoById,
   updateUserData: updateUserData,
   deleteUserById: deleteUserById,
}