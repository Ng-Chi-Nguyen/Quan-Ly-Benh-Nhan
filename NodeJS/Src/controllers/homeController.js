import db from "../models";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
   try {
      let data = await db.User.findAll()
      // console.log("---------------------")
      // console.log(data)
      return res.render("homePage.ejs", {
         data: JSON.stringify(data)
      });
   } catch (e) {
      console.log(e)
   }
}

let getAboutPage = (req, res) => {
   return res.render("./Test/about.ejs");
}

let getCRUD = (req, res) => {
   return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
   let message = await CRUDservice.createNewUser(req.body)
   // console.log(message)
   return res.send("POST CRUD")
}

let displayGetCRUD = async (req, res) => {
   let data = await CRUDservice.getAllUser()
   // console.log(data)
   return res.render("displayCRUD.ejs", {
      dataTable: data
   })
}

let getEditCRUD = async (req, res) => {
   // console.log(req.query.id)
   let UserId = req.query.id;
   if (UserId) {
      let userData = await CRUDservice.getUserInfoById(UserId)
      console.log("userData: ", userData)
      return res.render("editCRUD.ejs", {
         userData: userData
      })
   } else {
      return res.send("EDIT CRUD")
   }

}

let putCRUD = async (req, res) => {
   let data = req.body;
   await CRUDservice.updateUserData(data)
   return res.send("PUT CRUD")
}

let deleteCRUD = async (req, res) => {
   let id = req.query.id;
   if (id) {
      await CRUDservice.deleteUserById(id)
      return res.send("Đã xỏa người dùng thành công")
   } else {
      return res.send("Không tìm thấy người dùng")
   }

}

module.exports = {
   getHomePage: getHomePage,
   getAboutPage: getAboutPage,
   getCRUD: getCRUD,
   postCRUD: postCRUD,
   displayGetCRUD: displayGetCRUD,
   getEditCRUD: getEditCRUD,
   putCRUD: putCRUD,
   deleteCRUD: deleteCRUD,
}