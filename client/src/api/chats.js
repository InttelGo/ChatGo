import axios from "./axios";

export const chatRequest = (chat) =>
    axios.post(`/conversation/`, chat);

export const chatRequestUpdate = (chat) =>
    axios.put(`/conversation/update/`, chat);

export const messagesRequest = (chat) => axios.post(`/conversation/message/`, chat);

export const chatRedirectUpdate = (chat) => axios.put(`/conversation/redirect/`, chat);