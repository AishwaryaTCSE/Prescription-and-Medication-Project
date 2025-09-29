# Prescription and Medication Management Tool (Frontend)
## Overview
This is the **frontend** of the Prescription and Medication Management Tool.  
Built with **React** and **Tailwind CSS**, it helps patients:

- Track medications and schedules  
- Receive reminders  
- Request prescription renewals  
- View medication history  
- Customize dashboards  

The app is **responsive, interactive, and PWA-ready**.
## Features

### Dashboard
- Overview of current medications and upcoming doses  
- Medication cards with dosage, status, and actions  
- Drag-and-drop customization  

### Medication Reminders
- Real-time notifications for scheduled doses  
- Mark doses as Taken or Missed  
- Snooze or reschedule reminders  

### Prescription Renewals
- One-click renewal requests  
- Status updates: Pending, Approved  
- Expiration badges for medications nearing refill  

### Medication History
- Scrollable timeline of past and current medications  
- Filter by date, type, or status  

### Scheduling & Customization
- Flexible daily, weekly, or custom schedules  
- Adjustable dosages with sliders or steppers  

### Profile Management
- Manage allergies, conditions, and doctor contacts  
- Upload prescriptions (PDF, image)  

### Analytics
- Charts showing adherence trends  
- Badges for consistent medication tracking  

### In-App Assistance
- FAQ section and tooltips  
- Live chat support  
## Tech Stack
- **Frontend:** React, Tailwind CSS  
- **State Management:** Redux (optional)  
- **Notifications:** Custom React components  

## Project Structure
src/
├── assets/ # Images, logos
├── components/ # Reusable UI components
├── features/ # Feature-specific components
│ ├── auth/ # Login, Signup
│ ├── dashboard/ # Widgets, drag-grid
│ ├── medication/ # Medication forms & list
│ ├── schedule/ # Schedule components
│ ├── reminders/ # Reminder modals
│ ├── renewals/ # Renewal dialogs
│ ├── timeline/ # Medication timeline
│ └── support/ # Chat, FAQ
├── layouts/ # Navbar, Sidebar, Footer
├── pages/ # Home, Profile, History, Schedule
├── services/ # API & utilities
├── store/ # Redux store & slices
├── theme/ # Global styles
└── utils/ # Helper functions

---

## Installation
git clone https://github.com/AishwaryaTCSE/Prescription-and-Medication-Project.git
cd Prescription-and-Medication-Project
npm install
npm run dev


