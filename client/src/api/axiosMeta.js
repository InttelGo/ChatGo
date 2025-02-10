import axios from "axios";

const instance = axios.create({
  baseURL: "https://graph.facebook.com/v21.0/500922633112793/messages",
  headers: {
    Authorization: `Bearer EAAXdoAuWvzIBO65JLbnwZAj05ZCZBgr00G7KQUUgJDGZCtwQhQayEUDmbLl9916ox5JsB9iUgRR3n9vpN8EZA31dMdqzKfYZBOz4G4WKPkHX85ZCwXrlabiw3FuQordlanQBKpfEGWxWSk86RRdIp39dpxXFSLhRkzFc6vOXhGWrXhMf3woaAWfWwTRTabYFtJXdP5H7aJO0hStWbIUGmgpYPUQaNkZD`,
    "Content-Type": "application/json",
  },
});

export default instance;