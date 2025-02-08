import axios from "axios";
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post(`http://localhost:8088/api/login`, { email: userEmail, password: userPassword });
}

const getAllUsers = (userId) => {
   return axios.get(`http://localhost:8088/api/get-all-user?id=${userId}`);
}

export { handleLoginApi, getAllUsers };
