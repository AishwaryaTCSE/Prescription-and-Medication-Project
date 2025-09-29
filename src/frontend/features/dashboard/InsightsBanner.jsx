import React from 'react';
import Card from '../../components/Card';

const InsightsBanner = () => {
  // Dummy data for insights
  const adherenceRate = 92; // Percentage
  const upcomingDoses = 3;
  const needsRenewalCount = 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-indigo-500 text-white flex items-center justify-between p-5">
        <div>
          <p className="text-lg font-semibold">Adherence Rate</p>
          <p className="text-4xl font-bold">{adherenceRate}%</p>
          <p className="text-sm">This week</p>
        </div>
        <div className="text-5xl opacity-75">✅</div>
      </Card>

      <Card className="bg-amber-400 text-gray-900 flex items-center justify-between p-5">
        <div>
          <p className="text-lg font-semibold">Upcoming Doses</p>
          <p className="text-4xl font-bold">{upcomingDoses}</p>
          <p className="text-sm">In the next 24 hours</p>
        </div>
        <div className="text-5xl opacity-75">⏰</div>
      </Card>

      <Card className="bg-emerald-500 text-white flex items-center justify-between p-5">
        <div>
          <p className="text-lg font-semibold">Prescriptions</p>
          <p className="text-4xl font-bold">{needsRenewalCount}</p>
          <p className="text-sm">Needing Renewal</p>
        </div>
        <div className="text-5xl opacity-75">📄</div>
      </Card>
    </div>
  );
};

export default InsightsBanner;