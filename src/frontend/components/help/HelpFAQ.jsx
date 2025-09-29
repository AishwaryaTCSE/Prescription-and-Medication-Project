import React, { useState } from 'react';

const items = [
  { q: 'How do I set a medication schedule?', a: 'Go to Schedule, choose frequency and time, and save. You can customize days and dosage.' },
  { q: 'Can I receive reminders?', a: 'Yes. Allow notifications in your browser. We will send push notifications for reminders.' },
  { q: 'How to request a prescription renewal?', a: 'From Dashboard or Medications, click Request Renewal. You will see status updates on the Renewals widget.' },
];

const HelpFAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="border rounded-lg overflow-hidden">
          <button className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 flex justify-between items-center" onClick={()=>setOpen(open===idx?null:idx)}>
            <span className="font-medium text-gray-800">{it.q}</span>
            <span className="text-gray-500">{open===idx?'−':'+'}</span>
          </button>
          {open===idx && (
            <div className="px-4 py-3 bg-gray-50 text-gray-700 text-sm">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HelpFAQ;
