import React from 'react';

const badges = [
  { id: 'b1', label: '7-Day Streak', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'b2', label: 'On-Time Pro', color: 'bg-blue-100 text-blue-800' },
  { id: 'b3', label: 'Refill Champ', color: 'bg-amber-100 text-amber-800' },
];

const Badges = () => (
  <div className="flex flex-wrap gap-2">
    {badges.map(b => (
      <span key={b.id} className={`px-3 py-1 rounded-full text-xs font-medium ${b.color}`}>{b.label}</span>
    ))}
  </div>
);

export default Badges;
