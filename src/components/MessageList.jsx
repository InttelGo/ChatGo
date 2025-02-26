import React, { useRef, useEffect } from "react";

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderMessage = (message, index) => {
    return (
      <div
        key={index}
        className={`p-3 rounded shadow-sm my-2 ${
          message.fromType !== "clients"
            ? "align-self-end text-white"
            : "align-self-start bg-light"
        }`}
        style={{ maxWidth: "60%", borderRadius: "15px", background: message.fromType != "clients" ? "#ff9900" : ""}}
      >
        <p className="mb-1">{message.message}</p>
        <small
          className={message.fromType !== "clients" ? "text-white" : "text-muted"}
        >
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </small>
      </div>
    );
  };

  const renderRedirection = (message, index) => (
    <div key={index} className="text-center my-3 d-flex flex-column align-items-center">
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column align-items-center mx-2">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: "50px", height: "50px" }}>
            <i className="bi bi-person"></i>
          </div>
          <small className="text-muted">{message.from}</small>
        </div>
        <span className="mx-3 fs-3">➡</span>
        <div className="d-flex flex-column align-items-center mx-2">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: "50px", height: "50px" }}>
            <i className="bi bi-person"></i>
          </div>
          <small className="text-muted">{message.to}</small>
        </div>
      </div>
      <p className="mt-2 mb-1 text-muted">
        <strong>Mensaje:</strong> {message.reason}
      </p>
      <small className="text-muted">
        {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
      </small>
    </div>
  );

  return (
    <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          message.type === "redirection"
            ? renderRedirection(message, index)
            : renderMessage(message, index)
        ))
      ) : (
        <p className="text-center text-muted">No hay mensajes</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
