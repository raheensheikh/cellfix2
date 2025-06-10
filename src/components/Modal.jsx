import React from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  showHeader = true,
  showCloseButton = true,
  width = "500px",
  heading = "Modal Heading",
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: width }}
      >
        <div className="modal-content">
          {showHeader && (
            <div className="modal-header">
              <h5 className="modal-title">{heading}</h5>
              {showCloseButton && (
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                />
              )}
            </div>
          )}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
