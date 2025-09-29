import React, { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Modal from '../../components/Modal';
import { getMedications as apiGetMedications, getFhirMedications as apiGetFhirMedications } from '../../services/api';
import { useTheme } from '../../theme/ThemeProvider';
import { useLocation, useNavigate } from 'react-router-dom';

// Fallback demo data in case APIs are empty/unavailable
const dummyMedications = [
  { id: '1', name: 'Aspirin', dosage: '100mg', frequency: 'Once Daily', nextDose: 'Tomorrow 9:00 AM', status: 'Active', renewalNeeded: false },
  { id: '2', name: 'Metformin', dosage: '500mg', frequency: 'Twice Daily', nextDose: 'Today 8:00 PM', status: 'Active', renewalNeeded: true },
  { id: '3', name: 'Lisinopril', dosage: '10mg', frequency: 'Once Daily', nextDose: 'Tomorrow 7:00 AM', status: 'Paused', renewalNeeded: false },
];

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'paused', 'renewal'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMedication, setEditMedication] = useState(null);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', time: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        let meds = await apiGetMedications().catch(() => null);
        if (!Array.isArray(meds) || meds.length === 0) {
          const fhir = await apiGetFhirMedications().catch(() => null);
          if (Array.isArray(fhir) && fhir.length) meds = fhir;
        }
        if (!mounted) return;
        setMedications(Array.isArray(meds) && meds.length ? meds : dummyMedications);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || 'Failed to load medications');
        setMedications(dummyMedications);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Open Add Modal if URL contains ?add=1
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('add') === '1') {
      setShowAddModal(true);
      // remove query to avoid reopening on back/refresh
      params.delete('add');
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [location.search]);

  // Handlers for local add/edit/delete to keep UI interactive
  const handleAddMedication = (e) => {
    e.preventDefault();
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      const medToAdd = {
        id: `${Date.now()}`,
        ...newMedication,
        nextDose: '-',
        status: 'Active',
        renewalNeeded: false,
      };
      setMedications([...(medications || []), medToAdd]);
      setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
      setShowAddModal(false);
    } else {
      alert('Please fill in all medication details.');
    }
  };

  const handleDelete = (medId) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedications((medications || []).filter(med => med.id !== medId));
    }
  };

  const handleEdit = (med) => {
    setEditMedication(med);
    setNewMedication({ name: med.name, dosage: med.dosage, frequency: med.frequency, time: med.time || '' });
    setShowAddModal(true);
  };

  const handleUpdateMedication = (e) => {
    e.preventDefault();
    if (editMedication && newMedication.name && newMedication.dosage && newMedication.frequency) {
      setMedications((medications || []).map(med => med.id === editMedication.id ? { ...med, ...newMedication } : med));
      setEditMedication(null);
      setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
      setShowAddModal(false);
    } else {
      alert('Please fill in all medication details.');
    }
  };

  const handleStatusChange = (medId, newStatus) => {
    setMedications((medications || []).map(med => med.id === medId ? { ...med, status: newStatus } : med));
  };

  const handleRenewalToggle = (medId) => {
    setMedications((medications || []).map(med => med.id === medId ? { ...med, renewalNeeded: !med.renewalNeeded } : med));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (
      filter === 'all' ||
      (filter === 'active' && med.status === 'Active') ||
      (filter === 'paused' && med.status === 'Paused') ||
      (filter === 'renewal' && med.renewalNeeded)
    )
  );

  return (
    <Card className={`${isDark ? 'bg-[#0f1522] border border-slate-800 text-slate-200' : 'bg-white'} p-6`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">My Medications</h2>
        <div className="flex space-x-3 items-center">
          <InputField
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-3 border border-gray-300 rounded-md">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="renewal">Needs Renewal</option>
          </select>
          <Button onClick={() => { setEditMedication(null); setNewMedication({ name: '', dosage: '', frequency: '' }); setShowAddModal(true); }} variant="primary">
            + Add
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>
      )}
      {loading && (
        <div className="mb-3 p-3 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">Loading medications…</div>
      )}

      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${isDark ? 'divide-slate-800' : 'divide-gray-200'}`}>
          <thead className={`${isDark ? 'bg-[#0b121f] text-slate-300' : 'bg-gray-50'}`}>
            <tr>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Medication</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Dose</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`${isDark ? 'bg-[#0f1522] divide-slate-800' : 'bg-white divide-gray-200'}`}>
            {filteredMedications.map((med) => (
              <tr key={med.id}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{med.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{med.dosage}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{med.frequency}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{med.nextDose || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(med.status)}`}>
                    {med.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button onClick={() => handleRenewalToggle(med.id)} variant={med.renewalNeeded ? 'danger' : 'accent'} size="sm">
                    {med.renewalNeeded ? 'Cancel Renewal' : 'Needs Renewal'}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button onClick={() => handleEdit(med)} variant="outline" size="sm">Edit</Button>
                  <Button onClick={() => handleDelete(med.id)} variant="danger" size="sm">Delete</Button>
                  {med.status === 'Active' ? (
                    <Button onClick={() => handleStatusChange(med.id, 'Paused')} variant="secondary" size="sm">Pause</Button>
                  ) : (
                    <Button onClick={() => handleStatusChange(med.id, 'Active')} variant="accent" size="sm">Resume</Button>
                  )}
                </td>
              </tr>
            ))}
            {filteredMedications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">No medications found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Medication */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditMedication(null); setNewMedication({ name: '', dosage: '', frequency: '', time: '' }); }} title={editMedication ? "Edit Medication" : "Add New Medication"}>
        <form onSubmit={editMedication ? handleUpdateMedication : handleAddMedication} className="space-y-4">
          <InputField
            label="Medication Name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            placeholder="e.g., Paracetamol"
            required
          />
          <InputField
            label="Dosage"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            placeholder="e.g., 500mg"
            required
          />
          <InputField
            label="Frequency"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
            placeholder="e.g., Twice Daily"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              type="date"
              value={newMedication.startDate || ''}
              onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
            />
            <InputField
              label="Dose Time"
              type="time"
              value={newMedication.time}
              onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
              required
            />
          </div>
          <Button type="submit" variant="primary">{editMedication ? "Update Medication" : "Add Medication"}</Button>
        </form>
      </Modal>
    </Card>
  );
};

export default MedicationList;