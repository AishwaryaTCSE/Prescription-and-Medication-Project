import React from 'react';

const MedicationTimeline = ({ events = [] }) => {
  // events: [{ id, date, label, type }]
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
      <ul className="space-y-4">
        {events.map(e => (
          <li key={e.id} className="flex items-start gap-3">
            <span className={`mt-1 w-3 h-3 rounded-full ${e.type === 'taken' ? 'bg-emerald-500' : e.type === 'renewal' ? 'bg-blue-500' : 'bg-gray-400'}`} />
            <div>
              <p className="text-sm text-gray-500">{e.date}</p>
              <p className="text-gray-800">{e.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationTimeline;
