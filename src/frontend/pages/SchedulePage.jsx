import React, { useState } from 'react';
import StepperInput from '../components/schedule/StepperInput';
import Button from '../components/Button';

const SchedulePage = () => {
  const [medName, setMedName] = useState('');
  const [doseMg, setDoseMg] = useState(500);
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('08:00');
  const [days, setDays] = useState({ mon:true, tue:true, wed:true, thu:true, fri:true, sat:false, sun:false });

  const toggleDay = (k) => setDays({ ...days, [k]: !days[k]});

  const save = (e) => {
    e.preventDefault();
    alert(`Saved schedule for ${medName} - ${doseMg}mg, ${frequency} at ${time}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-emerald-50 border border-emerald-100">
        <h1 className="text-2xl font-extrabold text-gray-900">Medication Scheduling</h1>
        <p className="text-gray-600">Create or adjust your recurring schedule.</p>
      </div>

      <form onSubmit={save} className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Medication Name</label>
          <input className="w-full border rounded-md px-3 py-2" value={medName} onChange={(e)=>setMedName(e.target.value)} placeholder="e.g. Metformin" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Dosage (mg)</label>
          <StepperInput value={doseMg} min={0} max={2000} step={50} onChange={setDoseMg} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Frequency</label>
            <select className="w-full border rounded-md px-3 py-2" value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="twice">Twice Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom Days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time</label>
            <input type="time" className="w-full border rounded-md px-3 py-2" value={time} onChange={(e)=>setTime(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Custom Days</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(days).map(([k,v]) => (
                <button type="button" key={k} onClick={()=>toggleDay(k)} className={`px-3 py-1 rounded-full text-sm border ${v ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-gray-600 border-gray-200'}`}>{k.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" variant="primary">Save Schedule</Button>
      </form>
    </div>
  );
};

export default SchedulePage;
