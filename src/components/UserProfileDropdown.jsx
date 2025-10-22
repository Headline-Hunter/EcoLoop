import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES } from '../routes';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserProfileDropdown({ user, onLogout }) {
  const { navigate } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user's first initial
  const getUserInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: 'Profile',
      icon: '👤',
      action: () => {
        navigate(ROUTES.PROFILE);
        setIsOpen(false);
      }
    },
    {
      label: 'Track Orders',
      icon: '📦',
      action: () => {
        navigate(ROUTES.ORDERS);
        setIsOpen(false);
      }
    },
    {
      label: 'Messages',
      icon: '💬',
      badge: '3',
      action: () => {
        navigate(ROUTES.MESSAGES);
        setIsOpen(false);
      }
    },
    {
      label: 'Sign Out',
      icon: '🚪',
      action: () => {
        onLogout();
        setIsOpen(false);
      },
      danger: true
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 backdrop-blur-xl shadow-lg shadow-emerald-500/20 overflow-hidden group transition-all hover:shadow-emerald-500/40"
      >
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* User Initial - Centered and uppercase */}
        <span className="relative z-10 flex items-center justify-center w-full h-full text-sm font-bold text-emerald-300 transition-colors">
          {getUserInitial()}
        </span>

        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-950 rounded-full" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 origin-top-right"
          >
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

              {/* User Info Header */}
              <div className="relative px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border border-emerald-400/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-300">{getUserInitial()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-100 truncate">
                      {user?.username || 'User'}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="relative py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={item.action}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full px-4 py-3 flex items-center gap-3 text-sm transition-all group",
                      item.danger
                        ? "text-red-300 hover:bg-red-500/10"
                        : "text-neutral-300 hover:bg-white/5 hover:text-neutral-100"
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30">
                        {item.badge}
                      </span>
                    )}
                    {!item.danger && (
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
