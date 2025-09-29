import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

const RenewalDialog = ({ isOpen, onClose, medicationName, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Prescription Renewal">
      <p className="text-gray-700 mb-4">Send a renewal request for <span className="font-semibold">{medicationName}</span>?</p>
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="secondary" onClick={onConfirm}>Request Renewal</Button>
      </div>
    </Modal>
  );
};

export default RenewalDialog;
