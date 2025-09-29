import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

const ReminderModal = ({ isOpen, onClose, reminder, onSnooze, onReschedule }) => {
  if (!reminder) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reminder: ${reminder.message}`}>
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Scheduled time: <span className="font-medium">{reminder.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => onSnooze(reminder.id)}>Snooze 15m</Button>
          <Button variant="secondary" onClick={() => onReschedule(reminder.id)}>Reschedule</Button>
          <Button variant="accent" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReminderModal;
