import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import Button from '../../components/Button';
import { createAppointment } from '../../services/data.service';
import { useTheme } from '../../theme/ThemeProvider';

const times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

function Calendar({ value, onChange }) {
  // Simple month calendar for current month
  const d = new Date(value);
  const year = d.getFullYear();
  const month = d.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0 Sun .. 6 Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">{d.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => onChange(new Date(year, month - 1, Math.min(d.getDate(), 28)))}>‹</Button>
          <Button variant="outline" size="sm" onClick={() => onChange(new Date(year, month + 1, Math.min(d.getDate(), 28)))}>›</Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500 mb-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, idx) => {
          const selected = day && day === value.getDate();
          return (
            <button
              key={idx}
              disabled={!day}
              onClick={() => onChange(new Date(year, month, day))}
              className={`h-10 rounded-lg border text-sm ${
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

const ScheduleFullPage = () => {
  const { user } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [date, setDate] = useState(() => new Date());
  const [time, setTime] = useState('13:00');

  const longDate = useMemo(() => date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }), [date]);
  const displayName = useMemo(() => (user?.displayName?.split(' ')[0]) || (user?.email?.split('@')[0]) || 'User', [user]);
  const timeAmPm = useMemo(() => {
    const [h, m] = time.split(':');
    const d = new Date(); d.setHours(parseInt(h,10), parseInt(m,10));
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [time]);

  const confirm = async () => {
    if (!user?.uid) return;
    const payload = {
      dateISO: date.toISOString().slice(0, 10),
      time,
      durationMin: 30,
      status: 'confirmed',
      createdAt: Date.now(),
    };
    await createAppointment(user.uid, payload);
    navigate('/dashboard');
  };

  return (
    <div className={`${isDark ? 'bg-[#0b0f17]' : 'bg-slate-50'} min-h-screen flex flex-col`}>
      {/* Full-width page without sidebar */}
      <Navbar onMenuClick={() => {}} user={{ name: user?.displayName || user?.email?.split('@')[0] || 'User' }} dark={isDark} onLogout={() => navigate('/login')} />

      <main className="flex-1 p-4 md:p-6 lg:p-10">
        <div className={`max-w-6xl mx-auto rounded-2xl overflow-hidden ${isDark ? 'bg-[#0f1522] border border-slate-800' : 'bg-white border border-slate-200'} grid grid-cols-1 md:grid-cols-3`}>
          {/* Left: Calendar */}
          <div className={`${isDark ? 'bg-[#0f1522]' : 'bg-white'} p-6`}> 
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-700'}`}>Schedule Appointment</h2>
            <Calendar value={date} onChange={setDate} />
          </div>

          {/* Middle: pick a time */}
          <div className={`${isDark ? 'bg-[#0b121f] border-l border-slate-800' : 'bg-slate-50 border-l border-slate-200'} p-6`}> 
            <div className={`mb-4 font-semibold ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>Pick a time</div>
            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-3">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`w-full py-3 rounded-full text-sm border transition ${
                    time === t
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : `${isDark ? 'bg-[#0f1522] text-slate-200 border-slate-700 hover:bg-slate-800' : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-100'}`
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Right: summary card */}
          <div className={`${isDark ? 'bg-gradient-to-b from-teal-800 to-slate-900' : 'bg-gradient-to-b from-teal-200 to-teal-500'} p-6 flex flex-col justify-between`}>
            <div>
              {/* Doctor/clinic card */}
              <div className={`rounded-xl ${isDark ? 'bg-white/10' : 'bg-white/30'} p-4 mb-6 flex items-center gap-3`}> 
                <div className="w-10 h-10 rounded-full bg-white/80 text-teal-700 flex items-center justify-center font-bold">G</div>
                <div className="flex-1">
                  <div className="text-white font-semibold">GreenCare Clinic</div>
                  <div className="text-white/80 text-xs">Following WHO protocol. Your safety is our priority.</div>
                </div>
                <div className="text-white/80 text-sm">{displayName}</div>
              </div>

              <div className={`text-white text-sm opacity-90`}>Date</div>
              <div className={`text-white text-lg font-semibold mb-3`}>{longDate}</div>

              <div className={`text-white text-sm opacity-90`}>Time</div>
              <div className={`text-white text-lg font-semibold mb-3 flex items-center gap-2`}>
                <span>🕒</span>
                <span>{timeAmPm}</span>
              </div>

              <div className={`text-white text-sm opacity-90`}>Duration</div>
              <div className={`text-white text-lg font-semibold mb-6`}>30 min</div>
            </div>

            <Button onClick={confirm} className="mt-6 !bg-white !text-teal-700 hover:!bg-slate-100">Book appointment</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScheduleFullPage;
