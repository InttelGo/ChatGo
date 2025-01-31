import axios from "axios";

const instance = axios.create({
  baseURL: "https://meta.internetdedicado.com.co:8443/",
  withCredentials: true,
});

export default instance;