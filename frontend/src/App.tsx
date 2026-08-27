import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// User Pages
import { DashboardPage } from './pages/user/DashboardPage';
import { VerifyPage } from './pages/user/VerifyPage';
import { ResultsPage } from './pages/user/ResultsPage';
import { HistoryPage } from './pages/user/HistoryPage';
import { FilesPage } from './pages/user/FilesPage';
import { AnalyticsPage } from './pages/user/AnalyticsPage';
import { SettingsPage } from './pages/user/SettingsPage';
import { ProfilePage } from './pages/user/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminVerificationsPage } from './pages/admin/AdminVerificationsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSystemPage } from './pages/admin/AdminSystemPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* User Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <VerifyPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify/claim"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <VerifyPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify/upload"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <VerifyPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify/url"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <VerifyPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/results/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ResultsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HistoryPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FilesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AnalyticsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminDashboardPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminUsersPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/verifications"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminVerificationsPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminAuditLogsPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/system"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminSystemPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminAnalyticsPage />
                </AppLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AppLayout isAdmin>
                  <AdminSettingsPage />
                </AppLayout>
              </AdminRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
