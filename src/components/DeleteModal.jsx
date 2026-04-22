import React from 'react';

export default function DeleteModal({ isOpen, onClose, onConfirm, creatorName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Confirm your action!</h2>
          <p className="modal-message">
            Are you sure you want to delete <strong>{creatorName}</strong>? 
            This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button 
              className="modal-button cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="modal-button delete"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
