import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ROUTES } from './routes';
import { AnimatePresence } from 'framer-motion';

// Import your page components
import LandingPage from './pages/LandingPage';
import MarketplacePage from './pages/Marketplace';
import SellPage from './pages/Sell';
import DashboardPage from './pages/dashboard';
import ProfilePage from './pages/Profile';
import MessagesPage from './pages/Messages';
import OrdersPage from './pages/Orders';
import WishlistPage from './pages/Wishlist';
import AuthModal from './components/AuthModal';

// Protected Route Component
function ProtectedRoute({ element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-950">Loading...</div>;
  }

  // If no user, show auth modal
  if (!user) {
    return (
      <AnimatePresence>
        <AuthModal redirectTo={window.location.pathname} />
      </AnimatePresence>
    );
  }

  // User exists, show the element
  return element;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />
      <Route path={ROUTES.HELP} element={<div>Help Page</div>} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.SELL}
        element={<ProtectedRoute element={<SellPage />} />}
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={<ProtectedRoute element={<DashboardPage />} />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.ANALYTICS}
        element={<ProtectedRoute element={<div>Analytics Page</div>} />}
      />
      <Route
        path={ROUTES.ORDERS}
        element={<ProtectedRoute element={<OrdersPage />} />}
      />
      <Route
        path={ROUTES.MESSAGES}
        element={<ProtectedRoute element={<MessagesPage />} />}
      />
      <Route
        path={ROUTES.WISHLIST}
        element={<ProtectedRoute element={<WishlistPage />} />}
      />

      {/* Catch-all redirect to landing */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <AppRoutes />
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}