import axios from "axios";

const instance = axios.create({
  baseURL: "https://graph.facebook.com/v22.0/622052390983291/messages",
  headers: {
    Authorization: `Bearer EAAXdoAuWvzIBO2UJ4mmH0MCMotdxiKMXkhvicDscIcZBLuiWB78iH5yu30rRBoq3gRFEBDwfD579kaHNQdZCVG723Qak2F9cuo1sgGsE86SDT766IhUgzwp7lCpEbGIsHn5x2hL7OloEGtQyFqaZAEZCdPSZAkGTABXcjtc9uljPgjNJkCbyPYJKkXVaUdgwwGQZDZD`,
    "Content-Type": "application/json",
  },
});

export default instance;