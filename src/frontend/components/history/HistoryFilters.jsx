import React, { useState } from 'react';

const HistoryFilters = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const emit = () => onChange && onChange({ query, status, from, to });

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-end">
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Search</label>
        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Medication or event"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Status</label>
        <select
          className="border rounded-md px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="taken">Taken</option>
          <option value="missed">Missed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">From</label>
        <input type="date" className="border rounded-md px-3 py-2" value={from} onChange={(e)=>setFrom(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">To</label>
        <input type="date" className="border rounded-md px-3 py-2" value={to} onChange={(e)=>setTo(e.target.value)} />
      </div>
      <button className="px-4 py-2 rounded-md bg-emerald-600 text-white" onClick={emit}>Apply</button>
    </div>
  );
};

export default HistoryFilters;
