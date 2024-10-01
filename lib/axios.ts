import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = Axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth_token");

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
