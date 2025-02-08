import db from "../models"
import bcrypt from "bcrypt"
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

module.exports = {
   userLogin: userLogin
}