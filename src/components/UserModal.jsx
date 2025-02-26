import React from "react";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UsersContext";

const UserModal = ({
  isVisible,
  onClose,
  user2,
  textValue,
  handleChange,
  handleSave,
}) => {
  if (!isVisible) return null;
  const { user } = useAuth();

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Redireccionar Conversacion</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body mx-3">
              <p>
                <strong>De :</strong> {user.name}
              </p>
              <p>
                <strong>Para :</strong> {user2.user.name} * {user2.area}
              </p>
              <div className="form-floating mb-3">
                {/* username Input */}
                <input
                  type="text"
                  className="form-control"
                  name="textValue"
                  value={textValue}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingInput">Mensage</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default UserModal;
