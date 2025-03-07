import userService from "../services/userService";
let handleLogin = async (req, res) => {
   let email = req.body.email;
   let password = req.body.password;

   if (!email || !password) {
      return res.status(500).json({
         errCode: 1,
         message: "Thiếu tham số đầu vào"
      })
   }
   let userData = await userService.userLogin(email, password)
   return res.status(200).json({
      errCode: userData.errCode,
      message: userData.message,
      user: userData.user ? userData.user : {}
   })

}

let handleGetAllUser = async (req, res) => {
   let id = req.query.id; // ALl/id
   if (!id) {
      return res.status(200).json({
         errCode: 1,
         errMessage: 'Không  tìm thấy id trên hệ thống',
         users: []
      })
   }
   let users = await userService.getAllUser(id);

   return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      users
   })
}

let handleCreateNewUser = async (req, res) => {
   let message = await userService.createNewUser(req.body)
   // console.log(message)
   return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
   let data = req.body;
   let message = await userService.updateUserData(data)
   return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
   if (!req.body.id) {
      return res.status(200).json({
         errCode: 1,
         message: "Bạn chưa truyền id vào",
      })
   }
   let message = await userService.deleteUser(req.body.id)
   // console.log(message)
   return res.status(200).json(message)
}

module.exports = {
   handleLogin: handleLogin,
   handleGetAllUser: handleGetAllUser,
   handleCreateNewUser: handleCreateNewUser,
   handleEditUser: handleEditUser,
   handleDeleteUser: handleDeleteUser,
}