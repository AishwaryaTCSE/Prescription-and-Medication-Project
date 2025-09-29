import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './frontend/firebase';
import HomePage from './frontend/pages/HomePage';
import LoginPage from './frontend/features/auth/LoginPage';
import SignupPage from './frontend/features/auth/SignupPage';
import DarkDashboard from './frontend/features/dashboard/DarkDashboard';
import ProfilePage from './frontend/pages/ProfilePage';
import MedicationList from './frontend/features/medication/MedicationList';
import DashboardLayout from './frontend/layouts/DashboardLayout';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import { setAuthState, startAuthCheck } from './frontend/store/userSlice';
import HistoryPage from './frontend/pages/HistoryPage';
import SchedulePage from './frontend/pages/SchedulePage';
import ScheduleFullPage from './frontend/features/schedule/ScheduleFullPage';
import ChatWidget from './frontend/components/support/ChatWidget';
import HelpFAQ from './frontend/components/help/HelpFAQ';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(startAuthCheck());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Dispatch only serializable data to avoid Redux warnings
      const userPlain = user
        ? { uid: user.uid, email: user.email, displayName: user.displayName || '' }
        : null;
      dispatch(setAuthState({ user: userPlain }));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <ChatWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DarkDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout activeSidebarItem="profile" user={user}>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <DashboardLayout activeSidebarItem="history" user={user}>
                <HistoryPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <ScheduleFullPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <DashboardLayout activeSidebarItem="help" user={user}>
                <HelpFAQ />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/medications"
          element={
            <ProtectedRoute>
              <DashboardLayout activeSidebarItem="medications" user={user}>
                <MedicationList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
