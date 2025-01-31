import axios from "axios";

const API = "https://meta.webmastercolombia.net:8443/api";

export const roleRequest = () => axios.get(`${API}/role`);
