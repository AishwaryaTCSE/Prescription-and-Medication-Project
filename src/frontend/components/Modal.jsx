import React from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

      {/* Modal Content */}
      <div className={`relative w-auto my-6 mx-auto max-w-3xl ${className}`}>
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-gray-500 hover:text-gray-800">×</span>
            </button>
          </div>

          {/* Body */}
          <div className="relative p-6 flex-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
            <Button onClick={onClose} variant="outline" className="mr-3">
              Close
            </Button>
            {/* You can add a primary action button here if needed, e.g., for confirmation */}
            {/* <Button onClick={handleConfirm}>Save Changes</Button> */}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // Make sure you have a div with id="modal-root" in your public/index.html
  );
};

export default Modal;