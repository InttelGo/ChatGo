import axios from "axios";

const instance = axios.create({
  baseURL: "https://graph.facebook.com/v21.0/500922633112793/messages",
  headers: {
    Authorization: `Bearer EAAXdoAuWvzIBO1J422h1YJ3nEuhaZA759eUXLjQwfE4dYkhMoaPlTAiAcvZAL06OSum8xnvlpLbRXlI3BZCXpedwUkjXJiEkJg19ZBrY8lALdT55ugt7foSffg0ZCHrupmfb4896ELybWjXQAzdTudMqnYIfFmpo9PaYA9KOZCqtRUjchoVRjc38BsJIaZCQ6zmW4fhyrASDLtEAhKrzZAfZCNVPF8osZD`,
    "Content-Type": "application/json",
  },
});

export default instance;