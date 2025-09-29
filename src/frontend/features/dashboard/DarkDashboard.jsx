import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../layouts/Sidebar';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import Button from '../../components/Button';
import { ensureDemoData, getCounts, subscribeCounts, cancelAppointment, rescheduleAppointment } from '../../services/data.service';
import RescheduleModal from '../schedule/RescheduleModal';
import { logout } from '../../store/userSlice';
import { logoutUser } from '../../features/auth/auth.service';

// Simple donut using CSS conic-gradient so we don't add chart deps
const Donut = ({ percent = 64, size = 200, stroke = 18, colors = ['#22c55e', '#0ea5e9', '#f59e0b'] }) => {
  const total = 100;
  const p1 = percent;
  const p2 = Math.max(0, Math.min(25, 100 - p1)); // filler for demo
  const p3 = Math.max(0, total - p1 - p2);
  const style = {
    background: `conic-gradient(${colors[0]} 0 ${p1}%, ${colors[1]} ${p1}% ${p1 + p2}%, ${colors[2]} ${p1 + p2}% 100%)`,
    width: size,
    height: size,
  };
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="rounded-full" style={style}></div>
      <div className="absolute inset-0 m-auto rounded-full bg-[#0b0f17]" style={{ width: size - stroke * 2, height: size - stroke * 2 }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-extrabold text-white">{percent}%</div>
          <div className="text-xs text-slate-400">Male</div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-3 text-xs">
        <span className="inline-flex items-center gap-1 text-slate-300"><span className="w-2 h-2 rounded-full" style={{ background: colors[0] }}></span>Male</span>
        <span className="inline-flex items-center gap-1 text-slate-300"><span className="w-2 h-2 rounded-full" style={{ background: colors[1] }}></span>Female</span>
        <span className="inline-flex items-center gap-1 text-slate-300"><span className="w-2 h-2 rounded-full" style={{ background: colors[2] }}></span>Other</span>
      </div>
    </div>
  );
};

const MiniLine = ({ points = [20, 35, 30, 45, 60, 55, 70], color = '#22c55e' }) => {
  const width = 300; const height = 100; const max = Math.max(...points) || 1; const step = width / (points.length - 1);
  const d = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step},${height - (y / max) * height}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
      <path d={d} fill="none" stroke={color} strokeWidth="3" />
    </svg>
  );
};

const StatCard = ({ title, value, delta = '+2.05%', colorFrom = 'from-indigo-500', colorTo = 'to-blue-600' }) => (
  <div className="rounded-2xl bg-gradient-to-br p-[1px] from-slate-700 to-slate-800">
    <div className="rounded-2xl p-4 bg-[#0f1522] border border-slate-800">
      <div className={`rounded-xl p-3 bg-gradient-to-br ${colorFrom} ${colorTo} text-white font-semibold inline-flex`}>{title}</div>
      <div className="mt-3 text-4xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-xs text-emerald-400">{delta}</div>
      <div className="mt-3 text-[10px] text-slate-400">February 05, 2025</div>
    </div>
  </div>
);

const DarkDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((s) => s.user?.user);
  const dispatch = useDispatch();

  const [stats, setStats] = useState({ totalMeds: 0, activeSchedules: 0, refillsDue: 0, adherence: 0, meds: [], reminders: [] });

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    const load = async () => {
      try {
        setLoading(true);
        if (!user?.uid) return;
        await ensureDemoData(user.uid);
        // initial fetch
        const c = await getCounts(user.uid);
        if (mounted) setStats(c);
        // realtime subscription
        unsubscribe = subscribeCounts(user.uid, (live) => {
          if (mounted) setStats(live);
        });
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load dashboard');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; if (unsubscribe) unsubscribe(); };
  }, [user?.uid]);

  const onCancelAppt = async (id) => {
    if (!user?.uid) return;
    await cancelAppointment(user.uid, id);
  };

  const [resModalOpen, setResModalOpen] = useState(false);
  const [resAppt, setResAppt] = useState(null);
  const onRescheduleAppt = (id) => {
    const appt = (stats.appts || []).find(a => a.id === id);
    if (!appt) return;
    setResAppt(appt);
    setResModalOpen(true);
  };
  const onConfirmReschedule = async ({ dateISO, time }) => {
    if (!user?.uid || !resAppt) return;
    await rescheduleAppointment(user.uid, resAppt.id, { dateISO, time });
    setResModalOpen(false);
    setResAppt(null);
  };

  const handleLogout = async () => {
    await logoutUser().catch(() => {});
    dispatch(logout());
  };

  const sidebarMenu = [
    { id: 'dashboard', label: 'Overview', path: '/dashboard', icon: '📊' },
    { id: 'medications', label: 'Medications', path: '/medications', icon: '💊' },
    { id: 'patients', label: 'Patients', path: '/history', icon: '🗂️' },
    { id: 'analytics', label: 'Analytics', path: '/dashboard', icon: '📈' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0f17]">
      <Sidebar menuItems={sidebarMenu} activeItem="dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} variant="dark" user={{ name: user?.displayName || user?.email || 'User' }} />
      <div className="flex-1 flex flex-col">
        <Navbar dark user={{ firstName: user?.displayName || user?.email?.split('@')[0] || 'User' }} onLogout={handleLogout} onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 rounded-md bg-red-900/30 text-red-300 border border-red-800">{error}</div>}
          {loading && <div className="mb-4 p-3 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Loading…</div>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Meds" value={String(stats.totalMeds)} />
                <StatCard title="Active Schedules" value={String(stats.activeSchedules)} colorFrom="from-emerald-500" colorTo="to-teal-600" />
                <StatCard title="Refills Due" value={String(stats.refillsDue)} colorFrom="from-amber-500" colorTo="to-orange-600" />
                <StatCard title="Adherence" value={`${stats.adherence}%`} colorFrom="from-fuchsia-500" colorTo="to-purple-600" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-semibold">Adherence Trend</div>
                    <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">Weekly</Button>
                  </div>
                  <MiniLine />
                </div>
                <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5 flex flex-col items-center">
                  <div className="text-white font-semibold mb-4 w-full">Patients Gender</div>
                  <Donut />
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">Last Appointments</div>
                  <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">See All</Button>
                </div>
                <div className="space-y-4">
                  {[{ name: 'Jane Cooper', date: '24 May, 2025', dept: 'Neurology', no: 107 }, { name: 'Esther Howard', date: '24 May, 2025', dept: 'Cardiology', no: 196 }].map((a, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-[#0b121f] border border-slate-800 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-700" />
                        <div>
                          <div className="text-white font-medium">{a.name}</div>
                          <div className="text-xs text-slate-400">{a.date}</div>
                        </div>
                      </div>
                      <div className="text-xs text-emerald-400">{a.dept}</div>
                      <div className="text-xs text-slate-400">{a.no}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">All Reports</div>
                  <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">See All</Button>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between text-sm rounded-xl bg-[#0b121f] border border-slate-800 p-3">
                      <div className="text-slate-100">Prescription File</div>
                      <div className="text-slate-400">24 May, 2025</div>
                      <div className="text-slate-300">📄</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming timeline */}
              <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                <div className="text-white font-semibold mb-4">Upcoming</div>
                <div className="space-y-3">
                  {(stats.appts || [])
                    .filter(a => a.status !== 'canceled')
                    .sort((a,b)=> (a.dateISO||'').localeCompare(b.dateISO||'') || (a.time||'').localeCompare(b.time||''))
                    .slice(0,6)
                    .map(a => (
                      <div key={a.id} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <div className="text-slate-100">{a.dateISO} • {a.time}</div>
                        <div className="text-xs text-slate-400">30 min</div>
                      </div>
                    ))}
                  {(stats.appts || []).filter(a => a.status !== 'canceled').length === 0 && (
                    <div className="text-sm text-slate-400">No upcoming items</div>
                  )}
                </div>
              </div>

              {/* Appointments widget */}
              <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">Appointments</div>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {(stats.appts || []).length === 0 && (
                    <div className="text-sm text-slate-400">No appointments yet.</div>
                  )}
                  {(stats.appts || []).map((a) => (
                    <div key={a.id} className="flex items-center justify-between text-sm rounded-xl bg-[#0b121f] border border-slate-800 p-3">
                      <div className="text-slate-100">
                        <div className="font-medium">{a.dateISO} • {a.time}</div>
                        <div className={`text-xs ${a.status === 'confirmed' ? 'text-emerald-400' : a.status === 'canceled' ? 'text-red-400' : 'text-slate-400'}`}>{a.status}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => onRescheduleAppt(a.id)}>Reschedule</Button>
                        {a.status !== 'canceled' && (
                          <Button size="sm" variant="danger" onClick={() => onCancelAppt(a.id)}>Cancel</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0f1522] border border-slate-800 p-5">
                <div className="text-white font-semibold mb-3">Quick Actions</div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="!bg-emerald-600 !text-white">Add Medication</Button>
                  <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">Request Renewal</Button>
                  <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">Mark Dose Taken</Button>
                  <Button primary={false} className="!bg-slate-800 !text-slate-200 !border !border-slate-700">Set Reminder</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DarkDashboard;
