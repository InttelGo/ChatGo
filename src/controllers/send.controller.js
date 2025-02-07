import axios from "axios";

const token = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

export const sendMessage = async (req, res) => {
    const { to, message } = req.body;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error);
        res.status(500).json({ success: false, error: error.message });
    }
};
