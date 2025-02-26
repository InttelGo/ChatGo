import { useState, useEffect } from "react";

const ChatViewersAlert = ({ viewers }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (viewers.length > 0) {
      setIsVisible(true);
      console.log(viewers)
    }
  }, [viewers]);

  if (!isVisible || viewers.length === 0) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg" style={{width: "50%"}}>
      <p className="text-center font-semibold">
        {viewers.length === 1
          ? `${viewers[0]} está viendo la conversación`
          : `${viewers.join(", ")} están viendo la conversación`}
      </p>
    </div>
  );
};

export default ChatViewersAlert;