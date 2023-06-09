import axios from "axios";
// import { API_URL } from "../config";

const API_URL = "http://localhost:5001";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
