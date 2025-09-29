// Placeholder for medication service functions
// In a real app, this would handle API calls for CRUD operations on medications.

export const fetchMedications = async () => {
  console.log('Fetching medications...');
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Dummy data
  return [
    { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Once Daily', nextDose: 'Tomorrow 9:00 AM', status: 'Active', renewalNeeded: false },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice Daily', nextDose: 'Today 8:00 PM', status: 'Active', renewalNeeded: true },
  ];
};

export const addMedication = async (medData) => {
  console.log('Adding medication:', medData);
  await new Promise(resolve => setTimeout(resolve, 600));
  // Simulate API response
  return { ...medData, id: Date.now(), status: 'Active', renewalNeeded: false };
};

export const updateMedication = async (medId, medData) => {
  console.log(`Updating medication ${medId}:`, medData);
  await new Promise(resolve => setTimeout(resolve, 600));
  // Simulate API response
  return { id: medId, ...medData, status: medData.status || 'Active', renewalNeeded: medData.renewalNeeded || false };
};

export const deleteMedication = async (medId) => {
  console.log(`Deleting medication ${medId}`);
  await new Promise(resolve => setTimeout(resolve, 400));
  // Simulate API response
  return { success: true };
};