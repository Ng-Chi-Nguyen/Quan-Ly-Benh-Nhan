import axios from "axios";
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post(`http://localhost:8088/api-login`, { email: userEmail, password: userPassword });
}

export { handleLoginApi };
