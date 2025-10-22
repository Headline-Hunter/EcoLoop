import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation.jsx';
import { ROUTES, ROUTE_CONFIG } from '../routes';
import AuthModal from './AuthModal';
import UserProfileDropdown from './UserProfileDropdown';
import { WishlistContext } from '../contexts/WishlistContext';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SharedHeader({ className }) {
  const { currentPage, user, navigate, handleLogout } = useNavigation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { wishlistCount } = useContext(WishlistContext);

  // Public routes that always show
  const publicRoutes = [ROUTES.LANDING, ROUTES.MARKETPLACE];

  // Authenticated routes that only show when logged in
  const authRoutes = [ROUTES.SELL, ROUTES.DASHBOARD];

  return (
    <>
      <header className={cn("sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/80 border-b border-white/5", className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => navigate(ROUTES.LANDING)}
              whileHover={{ opacity: 0.8 }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="h-11 w-11 grid place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border border-emerald-300/40 shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-bold">♻</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">EcoLoop</div>
                <div className="hidden sm:block text-xs text-neutral-400">B2B E-waste Marketplace</div>
              </div>
            </motion.button>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {/* Public Routes - Always show */}
              {publicRoutes.map((route) => {
                const config = ROUTE_CONFIG[route];
                return (
                  <motion.button
                    key={route}
                    onClick={() => navigate(route)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      currentPage === route
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {currentPage === route && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-400/30 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Authenticated Routes - Only show if user is logged in */}
              {user && authRoutes.map((route) => {
                const config = ROUTE_CONFIG[route];
                return (
                  <motion.button
                    key={route}
                    onClick={() => navigate(route)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      currentPage === route
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {currentPage === route && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-400/30 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Sign In button - only show if NOT logged in */}
              {!user && (
                <motion.button
                  onClick={() => setShowAuthModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all"
                >
                  Sign In
                </motion.button>
              )}

              {/* Wishlist Heart Button */}
              <motion.button
                onClick={() => navigate(ROUTES.WISHLIST)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all"
              >
                <span className="text-lg">❤️</span>
                {wishlistCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                  >
                    {wishlistCount}
                  </motion.div>
                )}
              </motion.button>

              {/* List Item button - always show */}
              <motion.button
                onClick={() => {
                  if (!user) {
                    setShowAuthModal(true);
                  } else {
                    navigate(ROUTES.SELL);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
              >
                <span>✨</span>
                <span>List Item</span>
              </motion.button>

              {/* User Profile Dropdown - only show if logged in */}
              {user && (
                <UserProfileDropdown user={user} onLogout={handleLogout} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          onClick={() => setShowAuthModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AuthModal
              redirectTo={ROUTES.DASHBOARD}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}