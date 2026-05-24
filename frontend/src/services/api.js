import axios from "axios";

const API = axios.create({
  baseURL: "https://food-delivery-backend-y4e1.onrender.com/api",
});

export default API;