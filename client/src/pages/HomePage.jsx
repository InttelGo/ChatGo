import React, { useRef } from "react";
import ScrollableButtons  from "../components/ScrollableButtons";
const HomePage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card login shadow"
        style={{ height: "90%", width: "100%" }}
      >
        <div
          className=" d-flex vh-100"
          style={{ height: "90%", width: "100%" }}
        >
          {/* Sidebar */}

          <div
            className="col-1 d-flex flex-column justify-content-between align-items-center"
            style={{
              width: "60px",
              backgroundColor: "#f0f2f5",
            }}
          >
            {/* Icono superior */}
            <button className="primary-button my-3">
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                chat
              </span>
            </button>
            <button className="primary-button my-3">
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "2.5em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                account_circle
              </span>
            </button>
          </div>

          <div className="col-4 bg-light border-end p-3">
            <h5 className="fw-bold my-2">Type | ChatGo</h5>
            <div className="input-group bg-light mt-3 p-2 rounded bg-white d-flex align-items-center">
              <span
                class="material-symbols-rounded"
                style={{ color: "#ff9900" }}
              >
                search
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0"
                placeholder="Search"
                style={{ height: "100%" }}
              />
            </div>
            <ScrollableButtons />

            {/* Contact List */}
            <div className="list-group">
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex align-items-center"
                >
                  <div
                    className="rounded-circle bg-secondary me-2"
                    style={{ width: 40, height: 40 }}
                  ></div>
                  <div>
                    <strong>+57 3000-000-000</strong>
                    <p className="small text-muted">Mensaje previo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          <div className="col d-flex flex-column">
            <div className="bg-white p-3 border-bottom d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
              ></div>
              <strong>+57 3000-000-000</strong>
            </div>
            <div className="flex-grow-1 p-3 overflow-auto">
              {/* Messages */}
              <div className="d-flex flex-column">
                <div
                  className="align-self-start bg-light p-3 rounded mb-2"
                  style={{ maxWidth: "60%" }}
                >
                  <p className="mb-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod...
                  </p>
                  <small className="text-muted">HH:MM</small>
                </div>
                <div
                  className="align-self-end bg-warning p-3 rounded mb-2 text-white"
                  style={{ maxWidth: "60%" }}
                >
                  <p className="mb-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod...
                  </p>
                  <small className="text-white">HH:MM</small>
                </div>
              </div>
            </div>
            {/* Input Section */}
            <div className="p-3 border-top d-flex">
              <button className="btn btn-outline-secondary me-2">📎</button>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Write a message"
              />
              <button className="btn btn-warning">▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
