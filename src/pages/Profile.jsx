import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES } from '../routes';
import SharedHeader from '../components/SharedHeader';
import { AuthContext } from '../contexts/AuthContext';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Mock data generators based on role
const getSellerData = (user) => ({
  username: user?.username || "TechRecycle Pro",
  email: user?.email || "seller@ecoloop.com",
  role: "Seller",
  displayRole: "Premium Seller",
  joinDate: "January 2024",
  location: "Mumbai, India",
  phone: "+91 98765 43210",
  verified: true,
  stats: {
    totalSales: "₹24.5L",
    itemsSold: 156,
    rating: 4.9,
    responseTime: "< 2hrs"
  },
  achievements: [
    { id: 1, title: "Top Seller", icon: "🏆", color: "from-amber-500 to-orange-500" },
    { id: 2, title: "Verified Pro", icon: "✓", color: "from-emerald-500 to-cyan-500" },
    { id: 3, title: "Fast Responder", icon: "⚡", color: "from-blue-500 to-purple-500" },
    { id: 4, title: "Quality Star", icon: "⭐", color: "from-pink-500 to-rose-500" },
  ],
  recentActivity: [
    { id: 1, action: "Listed new item", item: "Dell Laptop Batch - 50 Units", time: "2 hours ago", icon: "📦" },
    { id: 2, action: "Sold successfully", item: "Server RAM DDR4", time: "5 hours ago", icon: "✅" },
    { id: 3, action: "Received payment", item: "₹1,80,000", time: "1 day ago", icon: "💰" },
    { id: 4, action: "New review received", item: "5 stars from GreenTech", time: "2 days ago", icon: "⭐" },
  ]
});

const getBuyerData = (user) => ({
  username: user?.username || "EcoTech Solutions",
  email: user?.email || "buyer@ecoloop.com",
  role: "Buyer",
  displayRole: "Premium Buyer",
  joinDate: "January 2024",
  location: "Delhi, India",
  phone: "+91 98765 43210",
  verified: true,
  stats: {
    totalSpent: "₹12.8L",
    itemsPurchased: 89,
    rating: 4.8,
    avgDelivery: "3-5 days"
  },
  achievements: [
    { id: 1, title: "Trusted Buyer", icon: "🎖️", color: "from-blue-500 to-purple-500" },
    { id: 2, title: "Verified Pro", icon: "✓", color: "from-emerald-500 to-cyan-500" },
    { id: 3, title: "Quick Payer", icon: "💳", color: "from-pink-500 to-rose-500" },
    { id: 4, title: "Eco Champion", icon: "🌱", color: "from-green-500 to-teal-500" },
  ],
  recentActivity: [
    { id: 1, action: "Placed order", item: "MacBook Parts - 15 Units", time: "1 hour ago", icon: "🛒" },
    { id: 2, action: "Payment completed", item: "₹95,000", time: "3 hours ago", icon: "💳" },
    { id: 3, action: "Received delivery", item: "Server RAM DDR4", time: "2 days ago", icon: "📦" },
    { id: 4, action: "Left review", item: "5 stars for TechRecycle", time: "3 days ago", icon: "⭐" },
  ]
});

const tabs = [
  { id: "overview", label: "Overview", icon: "👤" },
  { id: "settings", label: "Settings", icon: "⚙️" },
  { id: "activity", label: "Activity", icon: "📊" },
  { id: "security", label: "Security", icon: "🔒" },
];

export default function Profile() {
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Get role-specific data
  const initialData = user?.role === 'buyer' ? getBuyerData(user) : getSellerData(user);
  const [userData, setUserData] = useState(initialData);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Gradient Background - Role specific */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {userData.role === "seller" ? (
          <>
            <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />
            <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        ) : (
          <>
            <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
            <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>

      {/* Header */}
      <SharedHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section with Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-3xl border backdrop-blur-xl p-8 sm:p-12 overflow-hidden mb-8 ${
            userData.role === "seller"
              ? "border-emerald-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60"
              : "border-blue-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60"
          }`}
        >
          {/* Animated background orbs - Role specific */}
          {userData.role === "seller" ? (
            <>
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          ) : (
            <>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          )}

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className={`h-32 w-32 rounded-3xl border-4 shadow-2xl backdrop-blur-xl overflow-hidden ${
                userData.role === "seller"
                  ? "bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border-emerald-400/40 shadow-emerald-500/30"
                  : "bg-gradient-to-br from-blue-400/30 to-purple-400/30 border-blue-400/40 shadow-blue-500/30"
              }`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className={`text-6xl font-bold ${
                    userData.role === "seller" ? "text-emerald-300" : "text-blue-300"
                  }`}>
                    {userData.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              {/* Online indicator */}
              {userData.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl border-4 border-neutral-950 flex items-center justify-center shadow-lg ${
                    userData.role === "seller"
                      ? "bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-emerald-500/50"
                      : "bg-gradient-to-br from-blue-400 to-purple-400 shadow-blue-500/50"
                  }`}
                >
                  <span className="text-lg">✓</span>
                </motion.div>
              )}
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent ${
                  userData.role === "seller"
                    ? "from-emerald-300 to-cyan-300"
                    : "from-blue-300 to-purple-300"
                }`}
              >
                {userData.username}
              </motion.h1>
              <p className="text-neutral-400 mb-1">{userData.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${
                  userData.role === "seller"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                    : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                }`}>
                  {userData.displayRole}
                </span>
                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm font-semibold border border-cyan-400/30">
                  📍 {userData.location}
                </span>
                <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-semibold border border-purple-400/30">
                  📅 Joined {userData.joinDate}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all",
                isEditing
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-emerald-500/30 hover:shadow-emerald-500/50"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              )}
            >
              {isEditing ? "💾 Save Changes" : "✏️ Edit Profile"}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {Object.entries(userData.stats).map(([key, value], idx) => {
            const icons = {
              totalSales: "💰",
              itemsSold: "📦",
              rating: "⭐",
              responseTime: "⚡",
              totalSpent: "💰",
              itemsPurchased: "📦",
              avgDelivery: "🚚"
            };
            const colors = {
              totalSales: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
              itemsSold: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
              rating: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
              responseTime: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
              totalSpent: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
              itemsPurchased: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
              avgDelivery: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30"
            };

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "relative rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 transition-all cursor-pointer group overflow-hidden",
                  colors[key]
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{icons[key]}</span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-1 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-neutral-50">{value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "text-neutral-400 hover:text-neutral-200 border border-transparent hover:border-white/10"
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && <OverviewTab userData={userData} />}
            {activeTab === "settings" && <SettingsTab userData={userData} setUserData={setUserData} isEditing={isEditing} />}
            {activeTab === "activity" && <ActivityTab activity={userData.recentActivity} />}
            {activeTab === "security" && <SecurityTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ userData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {userData.achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 text-center group overflow-hidden"
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                achievement.color
              )} />
              <div className="relative z-10">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <p className="text-sm font-semibold text-neutral-200">{achievement.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {userData.recentActivity.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 6 }}
              className="p-4 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-200">{activity.action}</p>
                  <p className="text-sm text-neutral-400 truncate">{activity.item}</p>
                  <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ userData, setUserData, isEditing }) {
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          Personal Information
        </h3>
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-neutral-400 mb-2 capitalize">
                {key}
              </label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!isEditing}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border transition-all",
                  isEditing
                    ? "bg-white/5 border-emerald-500/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                    : "bg-white/5 border-white/10 cursor-not-allowed opacity-60",
                  "text-neutral-200 placeholder-neutral-500 outline-none"
                )}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Preferences
        </h3>
        <div className="space-y-4">
          {[
            { label: "Email Notifications", enabled: true },
            { label: "SMS Alerts", enabled: false },
            { label: "Marketing Updates", enabled: true },
            { label: "Weekly Reports", enabled: true },
          ].map((pref, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5"
            >
              <span className="text-neutral-200 font-medium">{pref.label}</span>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  pref.enabled ? "bg-emerald-500" : "bg-neutral-700"
                )}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  animate={{ x: pref.enabled ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Activity Tab Component
function ActivityTab({ activity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
    >
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
        Activity History
      </h3>
      <div className="space-y-3">
        {activity.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 6, scale: 1.01 }}
            className="p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/5 to-transparent hover:from-emerald-500/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-100">{item.action}</p>
                <p className="text-sm text-neutral-400">{item.item}</p>
              </div>
              <span className="text-xs text-neutral-500 whitespace-nowrap">{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Security Tab Component
function SecurityTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          Change Password
        </h3>
        <div className="space-y-4">
          {["Current Password", "New Password", "Confirm Password"].map((label, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                {label}
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-neutral-200 placeholder-neutral-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
          >
            Update Password
          </motion.button>
        </div>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔒</span>
              <div>
                <p className="font-semibold text-emerald-300">2FA Enabled</p>
                <p className="text-sm text-neutral-400">Your account is protected</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 rounded-xl border border-white/10 font-semibold hover:bg-white/5 transition-all"
          >
            Manage 2FA Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 font-semibold hover:bg-red-500/20 transition-all"
          >
            Disable 2FA
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
