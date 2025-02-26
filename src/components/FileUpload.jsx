import { useState } from "react";
import { FaFileAlt, FaImage } from "react-icons/fa";

export default function FileUpload({ isFileInputVisible, handleFileUpload }) {
  return (
    isFileInputVisible && (
      <div
        className="position-absolute bg-white p-2 rounded shadow m-2"
        style={{
          top: "67%",
          left: "60%",
          transform: "translateX(-100%)",
        }}
      >
        {/* Opción para documentos */}
        <div
          className="my-2 d-flex align-items-center p-2 rounded cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => document.getElementById("fileInputDoc").click()}
        >
          <FaFileAlt color="#8B5CF6" size={20} className="me-2" />
          <span>Document</span>
        </div>
        <input
          type="file"
          id="fileInputDoc"
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, "document")}
        />

        {/* Opción para imágenes */}
        <div
          className="my-2 d-flex align-items-center p-2 rounded cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => document.getElementById("fileInputImage").click()}
        >
          <FaImage color="#007BFF" size={20} className="me-2" />
          <span>Image</span>
        </div>
        <input
          type="file"
          id="fileInputImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, "image")}
        />
      </div>
    )
  );
}
