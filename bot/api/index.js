import { apiConfig } from "$bot/config/index.js";

import axios from "axios";

const API = axios.create({
  baseURL: apiConfig.baseUrl,
});

export { API };
