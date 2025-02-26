import axios from "./axios";

export const loginRequest = (user) => axios.post(`/api/auth/login`, user);

export const verifyToken = (token) => axios.post(`/api/auth/verifyToken`, token); 