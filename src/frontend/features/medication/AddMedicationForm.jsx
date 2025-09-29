import React, { useState } from 'react';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const AddMedicationForm = ({ onSubmit }) => {
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const formErrors = {};
    if (!medication.name) formErrors.name = 'Medication name is required.';
    if (!medication.dosage) formErrors.dosage = 'Dosage is required.';
    if (!medication.frequency) formErrors.frequency = 'Frequency is required.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(medication);
      setMedication({ name: '', dosage: '', frequency: '', instructions: '', startDate: '', endDate: '' }); // Reset form
    }
  };

  return (
    <Card className="bg-white p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add New Medication</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Medication Name"
          type="text"
          name="name"
          value={medication.name}
          onChange={handleChange}
          placeholder="e.g., Atorvastatin"
          error={errors.name}
          required
        />
        <InputField
          label="Dosage"
          type="text"
          name="dosage"
          value={medication.dosage}
          onChange={handleChange}
          placeholder="e.g., 20mg"
          error={errors.dosage}
          required
        />
        <InputField
          label="Frequency"
          type="text"
          name="frequency"
          value={medication.frequency}
          onChange={handleChange}
          placeholder="e.g., Once Daily in the evening"
          error={errors.frequency}
          required
        />
        <InputField
          label="Instructions"
          type="text"
          name="instructions"
          value={medication.instructions}
          onChange={handleChange}
          placeholder="e.g., Take with food"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Start Date"
            type="date"
            name="startDate"
            value={medication.startDate}
            onChange={handleChange}
          />
          <InputField
            label="End Date (Optional)"
            type="date"
            name="endDate"
            value={medication.endDate}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="primary" className="w-full">Add Medication</Button>
      </form>
    </Card>
  );
};

export default AddMedicationForm;