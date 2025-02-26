import axios from "./axios";
import axiosMeta from "./axiosMeta";

export const chatRequest = (chat) =>
    axios.post(`/api/conversations/`, chat);

export const chatRequestUpdate = (chat) =>
    axios.put(`/api/conversations/update/`, chat);

export const messagesRequest = (chat) => axios.post(`/api/,messages/`, chat);

export const chatRedirectUpdate = (chat) => axios.put(`/api/redirects/redirect/`, chat);

export const sendMessageRequest = (data) => axiosMeta.post("", data);

export const newMessagesUserRequest = (chat) => axios.post(`/api/messages/newmessage/user/`, chat);