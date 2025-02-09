import axios from "axios";
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post(`http://localhost:8088/api/login`, { email: userEmail, password: userPassword });
}

const getAllUsers = (userId) => {
   return axios.get(`http://localhost:8088/api/get-all-user?id=${userId}`);
}

const createNewUserService = (data) => {
   // console.log("Check user serivce", data)
   return axios.post(`http://localhost:8088/api/create-new-user`, data);
}

const deleteUserService = (userId) => {
   return axios.delete(`http://localhost:8088/api/delete-user`, {
      data: {
         id: userId,
      }
   });
}
const editUserService = (inputData) => {
   return axios.put(`http://localhost:8088/api/edit-user`, inputData);
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService };
