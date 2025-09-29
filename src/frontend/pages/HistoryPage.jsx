import React, { useState } from 'react';
import HistoryFilters from '../components/history/HistoryFilters';
import MedicationTimeline from '../components/timeline/MedicationTimeline';

const sampleEvents = [
  { id: 'e1', date: '2025-09-20 08:00', label: 'Took Metformin 500mg', type: 'taken' },
  { id: 'e2', date: '2025-09-21 09:00', label: 'Missed Aspirin 100mg', type: 'missed' },
  { id: 'e3', date: '2025-09-22 10:30', label: 'Renewal requested: Metformin', type: 'renewal' },
];

const HistoryPage = () => {
  const [filters, setFilters] = useState({});
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-emerald-50 border border-emerald-100">
        <h1 className="text-2xl font-extrabold text-gray-900">Medication History</h1>
        <p className="text-gray-600">Review your past doses, renewals and other events.</p>
      </div>
      <HistoryFilters onChange={setFilters} />
      <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
        <MedicationTimeline events={sampleEvents} />
      </div>
    </div>
  );
};

export default HistoryPage;
