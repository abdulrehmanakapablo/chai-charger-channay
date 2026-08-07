import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import DynamicCategoryInterstitial from './DynamicCategoryInterstitial';
import RecommendationPage from './RecommendationPage';
import ReviewPage from './ReviewPage';
import Layout from './Layout';

function CategoryInterstitialWrapper() {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  return (
    <DynamicCategoryInterstitial
      initialCategory={categoryKey || 'food'}
      onSelectAction={(category, action) => {
        if (action === 'explore') {
          navigate(`/recommendations/${category}`);
        } else if (action === 'review') {
          navigate(`/review/${category}`);
        }
      }}
    />
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111412] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} user={user} onLogout={logout} />} />
      <Route path="/login" element={<LoginPage onLogin={login} />} />
      <Route path="/signup" element={<SignUpPage onSignUp={login} />} />

      {/* Authenticated routes with navbar layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard user={user} onLogout={logout} />} />
        <Route path="/category/:categoryKey" element={<CategoryInterstitialWrapper />} />
        <Route path="/recommendations/:categoryKey" element={<RecommendationPage />} />
        <Route path="/review/:categoryKey" element={<ReviewPage />} />
      </Route>

      {/* Terms (public) */}
      <Route path="/terms" element={
        <div className="min-h-screen bg-[#111412] text-[#e1e3df] p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-[#c0c9c2]">Terms and Conditions details coming soon.</p>
        </div>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}