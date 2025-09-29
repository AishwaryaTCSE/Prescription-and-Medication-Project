import React, { useState } from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import DragDropUpload from '../components/uploads/DragDropUpload';
import { uploadPrescription } from '../services/api';

const ProfilePage = () => {
  // Dummy user data
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1990-05-15',
    phone: '123-456-7890',
    address: '123 Health St, Wellness City',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '987-654-3210',
  });

  // Dummy prescription uploads
  const [prescriptionUploads, setPrescriptionUploads] = useState([
    { id: 1, fileName: 'prescription_dr_smith_2023.pdf', date: '2023-10-26' },
    { id: 2, fileName: 'lab_report_2024.png', date: '2024-01-15' },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate API call to update profile
    console.log('Updating profile:', userProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePrescriptionUpload = async (file) => {
    try {
      // Send to backend; include simple metadata
      await uploadPrescription(file, { note: 'profile-upload' });
      const newUpload = {
        id: prescriptionUploads.length + 1,
        fileName: file.name,
        date: new Date().toISOString().split('T')[0],
      };
      setPrescriptionUploads([...prescriptionUploads, newUpload]);
      alert(`${file.name} uploaded successfully!`);
    } catch (e) {
      alert(`Upload failed: ${e.message}`);
    }
  };

  const handleDeletePrescription = (uploadId) => {
    if (window.confirm('Are you sure you want to delete this prescription upload?')) {
      setPrescriptionUploads(prescriptionUploads.filter(upload => upload.id !== uploadId));
    }
  };

  return (
    <Card className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "danger" : "primary"}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            value={userProfile.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            value={userProfile.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </div>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={userProfile.email}
          onChange={handleChange}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            value={userProfile.dob}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
          <InputField
            label="Phone Number"
            type="tel"
            name="phone"
            value={userProfile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </div>
        <InputField
          label="Address"
          type="text"
          name="address"
          value={userProfile.address}
          onChange={handleChange}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Emergency Contact Name"
            type="text"
            name="emergencyContact"
            value={userProfile.emergencyContact}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
          <InputField
            label="Emergency Contact Phone"
            type="tel"
            name="emergencyPhone"
            value={userProfile.emergencyPhone}
            onChange={handleChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="mt-6">
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        )}
      </form>

      <hr className="my-10 border-gray-200" />

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Prescription Uploads</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Prescription</label>
            <DragDropUpload onFile={handlePrescriptionUpload} />
          </div>

          {prescriptionUploads.length > 0 ? (
            <ul className="space-y-3">
              {prescriptionUploads.map((upload) => (
                <li key={upload.id} className="flex items-center justify-between text-sm text-gray-600 border-b pb-2 last:border-b-0">
                  <div>
                    <p>{upload.fileName}</p>
                    <p className="text-xs text-gray-400">Uploaded on: {upload.date}</p>
                  </div>
                  <Button onClick={() => handleDeletePrescription(upload.id)} variant="danger" size="sm">Delete</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No prescription uploads yet.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfilePage;