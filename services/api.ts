import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-nodejs-tqd5.onrender.com"
})