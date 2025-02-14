import axios from "axios";

const instance = axios.create({
  baseURL: "https://graph.facebook.com/v21.0/500922633112793/messages",
  headers: {
    Authorization: `Bearer EAAXdoAuWvzIBOzPOL1tHXGiTONZBVzR48Yq8otysDwrR3pQyGjwxHbOZAONyxVLcml9M7K4ZBVOvpAxzrCoqK3LvHtKOpEsAhhYrgoTUyHUI9lmBdM0udG6tZChhUl1xjI2qrPhDZAQxHKSpInh3ECd5JFquYZBFMJ7pZAdMbPGNdDLcZA8Xk2JfrzzpEmJTE9heHAZDZD`,
    "Content-Type": "application/json",
  },
});

export default instance;