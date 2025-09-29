import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InsightsBanner from './InsightsBanner';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import DragGrid from '../../components/dashboard/DragGrid';
import { Link } from 'react-router-dom';
import ReminderModal from '../../components/reminders/ReminderModal';
import RenewalDialog from '../../components/renewals/RenewalDialog';
import AdherenceChart from '../../components/analytics/AdherenceChart';
import Badges from '../../components/analytics/Badges';
import { getMedications as apiGetMedications, getReminders as apiGetReminders, getRenewals as apiGetRenewals, getFhirMedications as apiGetFhirMedications } from '../../services/api';


const Dashboard = () => {
  const [medications, setMedications] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddMedModal, setShowAddMedModal] = useState(false);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '' });
  const [isSnoozeModalOpen, setIsSnoozeModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [renewalDialog, setRenewalDialog] = useState({ open: false, medName: '', medId: null });

  // Dummy user data (replace with actual state from Redux/Context)
  const user = { name: 'User', email: 'user@example.com' };

  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { id: 'medications', label: 'My Medications', path: '/medications', icon: '💊' },
    { id: 'schedule', label: 'Schedule', path: '/schedule', icon: '📅' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
    { id: 'help', label: 'Help', path: '/help', icon: '❓' },
  ];

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [m, r, rn] = await Promise.all([
          apiGetMedications().catch(() => null),
          apiGetReminders().catch(() => null),
          apiGetRenewals().catch(() => null),
        ]);
        if (!mounted) return;
        let meds = Array.isArray(m) ? m : [];
        if (!meds.length) {
          const fhir = await apiGetFhirMedications().catch(() => null);
          if (Array.isArray(fhir) && fhir.length) meds = fhir;
        }
        setMedications(meds.length ? meds : dummyMedications);
        setReminders(Array.isArray(r) ? r : dummyReminders);
        setRenewals(Array.isArray(rn) ? rn : []);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || 'Failed to load dashboard data');
        setMedications(dummyMedications);
        setReminders(dummyReminders);
        setRenewals([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      const medToAdd = {
        id: medications.length + 1,
        ...newMedication,
        nextDose: 'Tomorrow 9:00 AM', // Placeholder
        status: 'Active',
        renewalNeeded: false,
      };
      setMedications([...medications, medToAdd]);
      setNewMedication({ name: '', dosage: '', frequency: '' });
      setShowAddMedModal(false);
    } else {
      alert('Please fill in all medication details.');
    }
  };

  const handleSnooze = (reminderId) => {
    const reminderToSnooze = reminders.find(r => r.id === reminderId);
    setSelectedReminder(reminderToSnooze);
    setIsSnoozeModalOpen(true);
  };

  const confirmSnooze = () => {
    // Implement snooze logic - e.g., update reminder time and status
    console.log('Snoozing reminder:', selectedReminder);
    setIsSnoozeModalOpen(false);
    setSelectedReminder(null);
  };

  const requestRenewal = (medId) => {
    // Simulate request renewal API call
    setRenewals(renewals.map(r => r.id === medId ? { ...r, requested: true, status: 'Renewal Requested' } : r));
    console.log(`Requesting renewal for medication ID: ${medId}`);
  };

  const openRenewalDialog = (medId, medName) => {
    setRenewalDialog({ open: true, medName, medId });
  };

  const confirmRenewalDialog = () => {
    if (renewalDialog.medId) {
      requestRenewal(renewalDialog.medId);
    }
    setRenewalDialog({ open: false, medName: '', medId: null });
  };

  const cancelRenewalDialog = () => setRenewalDialog({ open: false, medName: '', medId: null });

  const handleMedicationStatusChange = (medId, newStatus) => {
    setMedications(medications.map(med => med.id === medId ? { ...med, status: newStatus } : med));
    console.log(`Medication ${medId} status changed to ${newStatus}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar menuItems={sidebarMenu} activeItem="dashboard" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={() => {}} /> {/* Logout handler to be implemented */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Hero header to match homepage vibe */}
          <section className="rounded-2xl mb-6 p-8 bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Welcome back</h1>
                <p className="text-gray-600 mt-2">Your personalized medication overview and reminders</p>
              </div>
              <Button onClick={() => setShowAddMedModal(true)} variant="accent" className="self-start md:self-auto">
                + Add New Medication
              </Button>
            </div>
          </section>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">Dashboard Overview</h1>
            <Button onClick={() => setShowAddMedModal(true)} variant="primary">
              + Add New Medication
            </Button>
          </div>

          <InsightsBanner />

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>
          )}
          {loading && (
            <div className="mb-4 p-3 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">Loading your data…</div>
          )}

          <DragGrid
            widgets={[
              {
                id: 'meds',
                title: 'My Medications',
                element: (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Link to="/medications" className="text-sm text-indigo-600 hover:underline">View All</Link>
                    </div>
                    <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
                      {medications.slice(0, 5).map((med) => (
                        <li key={med.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-800">{med.name} ({med.dosage})</p>
                            <p className="text-sm text-gray-500">{med.frequency}</p>
                            <p className={`text-xs font-semibold ${med.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>{med.status}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {med.renewalNeeded && (
                              <Button onClick={() => openRenewalDialog(med.id, med.name)} variant="secondary" size="sm">Renew</Button>
                            )}
                            <Button onClick={() => handleMedicationStatusChange(med.id, med.status === 'Active' ? 'Paused' : 'Active')} variant={med.status === 'Active' ? 'outline' : 'accent'} size="sm">
                              {med.status === 'Active' ? 'Pause' : 'Resume'}
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              },
              {
                id: 'reminders',
                title: 'Upcoming Reminders',
                element: (
                  <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
                    {reminders.slice(0, 5).map((reminder) => (
                      <li key={reminder.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-800">{reminder.message}</p>
                          <p className="text-sm text-gray-500">{reminder.time}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reminder.status === 'Due' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{reminder.status}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {reminder.status === 'Due' && (
                            <Button onClick={() => handleSnooze(reminder.id)} variant="outline" size="sm">Snooze</Button>
                          )}
                          <Button variant="accent" size="sm">Mark as Taken</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              },
              {
                id: 'renewals',
                title: 'Prescription Renewals',
                element: (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {renewals.map((renewal) => (
                          <tr key={renewal.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{renewal.medicationName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${renewal.status === 'Pending Renewal' ? 'bg-yellow-100 text-yellow-800' : renewal.status === 'Renewal Requested' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{renewal.status}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {!renewal.requested ? (
                                <Button onClick={() => openRenewalDialog(renewal.id, renewal.medicationName)} variant="secondary" size="sm">Request Renewal</Button>
                              ) : (
                                <span className="text-gray-500 text-sm">Request Sent</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              ,
              {
                id: 'analytics',
                title: 'Adherence & Achievements',
                element: (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <AdherenceChart />
                    <Badges />
                  </div>
                )
              }
            ]}
          />
        </main>
      </div>

      {/* Add Medication Modal */}
      <Modal isOpen={showAddMedModal} onClose={() => setShowAddMedModal(false)} title="Add New Medication">
        <form onSubmit={handleAddMedication} className="space-y-4">
          <InputField
            label="Medication Name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            placeholder="e.g., Paracetamol"
          />
          <InputField
            label="Dosage"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            placeholder="e.g., 500mg"
          />
          <InputField
            label="Frequency"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
            placeholder="e.g., Twice Daily"
          />
          <Button type="submit" variant="primary">Add Medication</Button>
        </form>
      </Modal>

      {/* Reminder Snooze/Reschedule Modal */}
      <ReminderModal
        isOpen={isSnoozeModalOpen}
        onClose={() => setIsSnoozeModalOpen(false)}
        reminder={selectedReminder}
        onSnooze={() => { /* hook real snooze */ setIsSnoozeModalOpen(false); }}
        onReschedule={() => { /* hook real reschedule */ setIsSnoozeModalOpen(false); }}
      />

      {/* Renewal Confirmation Dialog */}
      <RenewalDialog
        isOpen={renewalDialog.open}
        onClose={cancelRenewalDialog}
        medicationName={renewalDialog.medName}
        onConfirm={confirmRenewalDialog}
      />

      {/* Snooze Reminder Modal */}
      <Modal isOpen={isSnoozeModalOpen} onClose={() => setIsSnoozeModalOpen(false)} title={`Snooze ${selectedReminder?.message || 'Reminder'}`}>
        {selectedReminder && (
          <div>
            <p className="mb-4">Select a new time for this reminder:</p>
            {/* You can add time input/selection here */}
            <p className="text-gray-600 text-sm italic">Snoozing for 15 minutes.</p>
            <Button onClick={confirmSnooze} variant="primary" className="mt-4">Confirm Snooze</Button>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};

export default Dashboard;