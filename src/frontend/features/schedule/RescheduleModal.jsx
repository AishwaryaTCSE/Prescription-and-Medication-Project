import React, { useMemo, useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function Calendar({ value, onChange }) {
  const d = new Date(value);
  const year = d.getFullYear();
  const month = d.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">{d.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => onChange(new Date(year, month - 1, Math.min(d.getDate(), 28)))}>‹</Button>
          <Button variant="outline" size="sm" onClick={() => onChange(new Date(year, month + 1, Math.min(d.getDate(), 28)))}>›</Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-500 mb-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          const selected = day && day === value.getDate();
          return (
            <button
              key={idx}
              disabled={!day}
              onClick={() => onChange(new Date(year, month, day))}
              className={`h-8 rounded-md border text-xs ${
                selected ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {day || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const defaultTimes = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

const RescheduleModal = ({ isOpen, onClose, onConfirm, currentDateISO, currentTime, times = defaultTimes }) => {
  const initialDate = useMemo(() => currentDateISO ? new Date(currentDateISO) : new Date(), [currentDateISO]);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(currentTime || '13:00');

  const displayTime = useMemo(() => {
    const [h, m] = time.split(':').map(Number);
    const d = new Date(); d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [time]);

  const confirm = () => {
    onConfirm({ dateISO: date.toISOString().slice(0,10), time });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reschedule appointment" className="w-full max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Calendar value={date} onChange={setDate} />
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Pick a time</div>
          <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
            {times.map((t) => (
              <button key={t} onClick={() => setTime(t)} className={`w-full py-2 rounded-md text-sm border ${time === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-100'}`}>{t}</button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">Selected: <span className="font-medium">{date.toDateString()}</span> at <span className="font-medium">{displayTime}</span></div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default RescheduleModal;
