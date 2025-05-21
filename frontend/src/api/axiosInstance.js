import axios from "axios";
import { API_URL } from "../utils.js";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;