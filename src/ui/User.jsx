import React, { useRef, useState } from "react";
import UserList from "../components/UserList";


function Admin() {
    return (

        <div className="d-flex h-100" style={{ width: "100%" }}>
            <div className="col-3 bg-light border-end p-3">
                <div>
                    <h5 className="fw-bold my-2">Type | Admin</h5>
                    <div className="input-group bg-light mt-3 p-2 rounded bg-white d-flex align-items-center">
                        <span
                            className="material-symbols-rounded"
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
                </div>
                {/* User List */}
                <UserList/>
            </div>

        </div>
    );

}

export default Admin;