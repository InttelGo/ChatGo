import axios from "./axios";

export const roleRequest = (token) => axios.post(`/api/role`, token);
