import axios from "./axios";

export const userRequest = (token) => axios.post(`/api/users`, token);
