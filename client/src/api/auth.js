import axios from "axios";

const API = "https://meta.webmastercolombia.net:8443";

export const loginRequest = (user) => axios.post(`${API}/login`, user);
