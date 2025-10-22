import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES, ROUTE_CONFIG } from '../routes';
import SharedHeader from '../components/SharedHeader';
import { AuthContext } from '../contexts/AuthContext';

// Seller Analytics Data
const analyticsData = [
  { month: "Aug", sales: 450000, orders: 12 },
  { month: "Sep", sales: 680000, orders: 18 },
  { month: "Oct", sales: 920000, orders: 24 },
];

const categoryData = [
  { name: "Laptops", value: 35, icon: "💻" },
  { name: "Mobile", value: 28, icon: "📱" },
  { name: "Servers", value: 20, icon: "🖥️" },
  { name: "Appliances", value: 17, icon: "🧺" },
];

const mockListings = [
  { id: 1, title: "Dell Laptop Scrap - 50 Units", price: 72500, views: 342, offers: 12, status: "active", trend: "+12%" },
  { id: 2, title: "Mixed Mobile Phones - 100 Units", price: 180000, views: 521, offers: 24, status: "active", trend: "+28%" },
  { id: 3, title: "Server RAM DDR4 - 500 Sticks", price: 375000, views: 1240, offers: 87, status: "active", trend: "+45%" },
];

const mockTransactions = [
  { id: 1, buyer: "CollegeLabs Delhi", amount: 180000, date: "Oct 15", status: "completed", items: 50 },
  { id: 2, buyer: "Green Recyclers", amount: 245000, date: "Oct 12", status: "completed", items: 120 },
  { id: 3, buyer: "EcoTech Solutions", amount: 125000, date: "Oct 10", status: "pending", items: 75 },
];

// Buyer Data
const buyerOrders = [
  { id: 1, title: "Server RAM DDR4 - 200 Sticks", seller: "TechRecycle Pro", amount: 180000, date: "Oct 18", status: "shipped", tracking: "TRK1234567890" },
  { id: 2, title: "MacBook Air Parts - 15 Units", seller: "AppleRecycle Co", amount: 95000, date: "Oct 14", status: "delivered", tracking: "TRK0987654321" },
  { id: 3, title: "Network Switches - 10 Units", seller: "NetEquip Recyclers", amount: 225000, date: "Oct 10", status: "processing", tracking: "TRK5555666677" },
];

const buyerSpendingData = [
  { month: "Aug", amount: 320000 },
  { month: "Sep", amount: 480000 },
  { month: "Oct", amount: 500000 },
];

const buyerCategorySpending = [
  { name: "Laptops", value: 320000, color: "#10b981" },
  { name: "Mobile", value: 180000, color: "#06b6d4" },
  { name: "Servers", value: 420000, color: "#8b5cf6" },
  { name: "Others", value: 80000, color: "#f59e0b" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sellerTabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "listings", label: "My Listings", icon: "📦" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "transactions", label: "Transactions", icon: "💰" },
];

const buyerTabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "My Orders", icon: "📦" },
  { id: "spending", label: "Spending", icon: "💳" },
  { id: "saved", label: "Saved Items", icon: "⭐" },
];

function GradientGlow({ mode }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === "seller" ? (
          <motion.div
            key="seller-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-fuchsia-500/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl" />
          </motion.div>
        ) : (
          <motion.div
            key="buyer-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
            <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Dashboard() {
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const dashboardMode = user?.role || "seller"; // Get mode from user's role
  const [activeTab, setActiveTab] = useState("overview");

  const currentTabs = dashboardMode === "seller" ? sellerTabs : buyerTabs;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <GradientGlow mode={dashboardMode} />

      {/* Header */}
      <SharedHeader className="sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/80 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              onClick={() => navigate(ROUTES.LANDING)}
              className="flex items-center gap-3 hover:opacity-80"
            >
              <div className={cn(
                "h-11 w-11 grid place-items-center rounded-2xl border shadow-lg transition-all",
                dashboardMode === "seller"
                  ? "bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border-emerald-300/40 shadow-emerald-500/20"
                  : "bg-gradient-to-br from-blue-400/30 to-purple-400/30 border-blue-300/40 shadow-blue-500/20"
              )}>
                <span className="text-xl font-bold">♻</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">EcoLoop</div>
                <div className="hidden sm:block text-xs text-neutral-400">
                  {dashboardMode === "seller" ? "Seller Dashboard" : "Buyer Dashboard"}
                </div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-2">
              {Object.entries(ROUTES).map(([key, route]) => {
                const config = ROUTE_CONFIG[route];
                if (!config?.showInNav) return null;

                return (
                  <button
                    key={route}
                    onClick={() => navigate(route)}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      route === ROUTES.DASHBOARD
                        ? dashboardMode === "seller" ? "text-emerald-300" : "text-blue-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {route === ROUTES.DASHBOARD && (
                      <motion.div
                        layoutId="activeTab"
                        className={cn(
                          "absolute inset-0 rounded-xl border",
                          dashboardMode === "seller"
                            ? "bg-emerald-500/10 border-emerald-400/30"
                            : "bg-blue-500/10 border-blue-400/30"
                        )}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-sm">
                <span className="text-2xl">{dashboardMode === "seller" ? "🏢" : "👤"}</span>
                <div>
                  <div className="font-semibold">
                    {dashboardMode === "seller" ? "TechRecycle Pro" : "John Buyer"}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {dashboardMode === "seller" ? "seller@example.com" : "buyer@example.com"}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(ROUTES.LANDING)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Sign Out
              </motion.button>
              {dashboardMode === "seller" && (
                <button
                  onClick={() => navigate(ROUTES.SELL)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                >
                  <span>✨</span>
                  <span>List Item</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </SharedHeader>

      {/* Dashboard Tabs */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {currentTabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap flex-shrink-0",
                  activeTab === tab.id
                    ? dashboardMode === "seller"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                      : "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                    : "text-neutral-400 hover:text-neutral-200 border border-white/10 hover:border-white/20"
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${dashboardMode}-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {dashboardMode === "seller" ? (
              <>
                {activeTab === "overview" && <SellerOverview />}
                {activeTab === "listings" && <SellerListings />}
                {activeTab === "analytics" && <SellerAnalytics />}
                {activeTab === "transactions" && <SellerTransactions />}
              </>
            ) : (
              <>
                {activeTab === "overview" && <BuyerOverview />}
                {activeTab === "orders" && <BuyerOrders />}
                {activeTab === "spending" && <BuyerSpending />}
                {activeTab === "saved" && <BuyerSaved />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-10 w-10 grid place-items-center rounded-xl border",
                dashboardMode === "seller"
                  ? "bg-emerald-400/10 border-emerald-300/30"
                  : "bg-blue-400/10 border-blue-300/30"
              )}>
                <span className="text-lg">♻</span>
              </div>
              <div>
                <div className="font-semibold">EcoLoop</div>
                <div className="text-sm text-neutral-400">Closing the loop on electronics</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <a className={cn(
                "transition-colors",
                dashboardMode === "seller" ? "hover:text-emerald-400" : "hover:text-blue-400"
              )} href="#">Terms</a>
              <a className={cn(
                "transition-colors",
                dashboardMode === "seller" ? "hover:text-emerald-400" : "hover:text-blue-400"
              )} href="#">Privacy</a>
              <a className={cn(
                "transition-colors",
                dashboardMode === "seller" ? "hover:text-emerald-400" : "hover:text-blue-400"
              )} href="#">Help</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} EcoLoop Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==================== SELLER COMPONENTS ====================

function SellerOverview() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-neutral-900/60 via-neutral-900/40 to-neutral-950/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
          >
            Welcome back, TechRecycle Pro! 💼
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-300"
          >
            Your selling performance is outstanding this month
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Sales", value: "₹12.5L", icon: "💰", trend: "+15%", color: "emerald" },
          { label: "Active Listings", value: "12", icon: "📦", trend: "+3", color: "cyan" },
          { label: "Total Views", value: "2.1K", icon: "👁️", trend: "+24%", color: "purple" },
          { label: "Avg Rating", value: "4.8⭐", icon: "⭐", trend: "+0.2", color: "amber" },
        ].map((stat, idx) => {
          const colorGradients = {
            emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-400/60",
            cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60",
            purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-400/60",
            amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-400/60",
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={cn(
                "relative rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 transition-all cursor-pointer group overflow-hidden",
                colorGradients[stat.color]
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <motion.span
                    className="text-4xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {stat.icon}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 font-semibold border border-white/20"
                  >
                    {stat.trend}
                  </motion.span>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-1 font-medium">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold group-hover:text-emerald-300 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SellerBarChart />
        <SellerCategoryStats />
      </div>

      {/* Listings & Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 group transition-all overflow-hidden hover:border-emerald-500/30"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Top Performing Listings
            </h3>
            <div className="space-y-3">
              {mockListings.map((listing, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-transparent hover:border-emerald-400/40 hover:from-emerald-500/20 transition-all cursor-pointer group/item"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm line-clamp-1 group-hover/item:text-emerald-300 transition-colors text-neutral-200">{listing.title}</p>
                    <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap ml-2">{listing.trend}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 gap-2">
                    <span>👁 {listing.views}</span>
                    <span>💬 {listing.offers}</span>
                    <span className="text-emerald-300 font-semibold">₹{(listing.price / 1000).toFixed(0)}K</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 group transition-all overflow-hidden hover:border-cyan-500/30"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {mockTransactions.map((tx, idx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ x: -6 }}
                  className="p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-transparent hover:border-cyan-400/40 hover:from-cyan-500/20 transition-all cursor-pointer group/item"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm group-hover/item:text-cyan-300 transition-colors text-neutral-200">{tx.buyer}</p>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap",
                      tx.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    )}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 gap-2">
                    <span>{tx.date}</span>
                    <span>{tx.items} items</span>
                    <span className="text-emerald-300 font-semibold">₹{(tx.amount / 1000).toFixed(0)}K</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SellerBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden group hover:border-emerald-500/30 transition-all"
    >
      {/* Glowing orbs in background */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Revenue vs Orders
          </h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50" />
              <span className="text-neutral-400">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50" />
              <span className="text-neutral-400">Orders</span>
            </div>
          </div>
        </div>

        <div className="relative w-full rounded-2xl bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-transparent border border-emerald-500/20 p-6 backdrop-blur-sm shadow-inner">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={analyticsData}
              margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(16, 185, 129, 0.1)"
                vertical={false}
                strokeWidth={1}
              />
              <XAxis
                dataKey="month"
                stroke="rgba(16, 185, 129, 0.5)"
                style={{ fontSize: "13px", fontWeight: "600" }}
                tick={{ fill: "rgba(255,255,255,0.6)" }}
              />
              <YAxis
                stroke="rgba(16, 185, 129, 0.5)"
                style={{ fontSize: "13px", fontWeight: "600" }}
                tick={{ fill: "rgba(255,255,255,0.6)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 15, 25, 0.95)",
                  border: "2px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: "16px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                  padding: "12px"
                }}
                cursor={{ fill: "rgba(16, 185, 129, 0.1)", radius: 8 }}
                labelStyle={{ color: "#d1fae5", fontWeight: "bold", marginBottom: "8px" }}
                itemStyle={{ color: "#fff", fontWeight: "600" }}
              />
              <Bar
                dataKey="sales"
                fill="url(#gradRevenue)"
                radius={[12, 12, 0, 0]}
                filter="url(#glow)"
              />
              <Bar
                dataKey="orders"
                fill="url(#gradOrders)"
                radius={[12, 12, 0, 0]}
                filter="url(#glow)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function SellerCategoryStats() {
  const colors = [
    { from: '#06b6d4', to: '#0891b2', glow: 'rgba(6, 182, 212, 0.3)' },
    { from: '#8b5cf6', to: '#7c3aed', glow: 'rgba(139, 92, 246, 0.3)' },
    { from: '#10b981', to: '#059669', glow: 'rgba(16, 185, 129, 0.3)' },
    { from: '#f59e0b', to: '#d97706', glow: 'rgba(245, 158, 11, 0.3)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden group hover:border-cyan-500/30 transition-all"
    >
      {/* Animated background glow */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 space-y-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Category Breakdown
        </h3>

        <div className="space-y-5">
          {categoryData.map((cat, idx) => {
            const percentage = cat.value;
            const color = colors[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.08 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {cat.icon}
                    </motion.span>
                    <span className="font-semibold text-neutral-100">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${color.from}, ${color.to})`
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.08, type: "spring" }}
                    >
                      {percentage}
                    </motion.span>
                    <span className="text-sm text-neutral-400 font-medium">%</span>
                  </div>
                </div>

                <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
                  {/* Background glow */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.4 + idx * 0.08, duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 blur-md"
                    style={{
                      background: `linear-gradient(to right, ${color.from}, ${color.to})`,
                      opacity: 0.5
                    }}
                  />
                  {/* Solid bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.4 + idx * 0.08, duration: 1, ease: "easeOut" }}
                    className="relative h-full rounded-full shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${color.from}, ${color.to})`,
                      boxShadow: `0 0 20px ${color.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`
                    }}
                  >
                    {/* Glass shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
            <p className="text-xs text-neutral-400 font-medium">Total inventory distribution across all categories</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SellerListings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          My Listings
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
        >
          + New Listing
        </motion.button>
      </div>
      <div className="grid gap-4">
        {mockListings.map((listing, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-6 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-neutral-50">{listing.title}</h3>
                <p className="text-sm text-neutral-400 mt-2">👁 {listing.views} views • 💬 {listing.offers} offers</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-300">₹{(listing.price / 1000).toFixed(0)}K</p>
                <span className="text-xs text-emerald-400 font-semibold">{listing.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SellerAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          Advanced Analytics
        </h2>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50 animate-pulse" />
          <span className="text-neutral-400 font-semibold">Sales Trend</span>
        </div>
      </div>

      <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10">
          <div className="w-full rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 border border-emerald-500/20 p-6 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorLineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="50%" stopColor="#059669" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#047857" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="50%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(16, 185, 129, 0.1)"
                  strokeWidth={1}
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(16, 185, 129, 0.5)"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                  tick={{ fill: "rgba(255,255,255,0.6)" }}
                />
                <YAxis
                  stroke="rgba(16, 185, 129, 0.5)"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                  tick={{ fill: "rgba(255,255,255,0.6)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 15, 25, 0.95)",
                    border: "2px solid rgba(16, 185, 129, 0.5)",
                    borderRadius: "16px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                    padding: "12px"
                  }}
                  labelStyle={{ color: "#d1fae5", fontWeight: "bold", marginBottom: "8px" }}
                  itemStyle={{ color: "#fff", fontWeight: "600" }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="url(#lineStroke)"
                  strokeWidth={4}
                  dot={{
                    fill: "#10b981",
                    stroke: "#059669",
                    strokeWidth: 3,
                    r: 6,
                    filter: "url(#lineGlow)"
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#10b981",
                    stroke: "#fff",
                    strokeWidth: 2,
                    filter: "url(#lineGlow)"
                  }}
                  fill="url(#colorLineGradient)"
                  filter="url(#lineGlow)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SellerTransactions() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
        All Transactions
      </h2>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-300">Buyer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-300">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-300">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-neutral-200">{tx.buyer}</td>
                <td className="px-6 py-4 text-emerald-300 font-semibold">₹{(tx.amount / 1000).toFixed(0)}K</td>
                <td className="px-6 py-4 text-neutral-400">{tx.date}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs px-3 py-1 rounded-lg font-semibold",
                    tx.status === "completed" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  )}>
                    {tx.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== BUYER COMPONENTS ====================

function BuyerOverview() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-neutral-900/60 via-neutral-900/40 to-neutral-950/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent"
          >
            Welcome back, John! 🛒
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-300"
          >
            Your buying activity and order summary
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Spent", value: "₹10L", icon: "💳", trend: "+8%", bgColor: "from-neutral-900/95 to-neutral-950/95", borderColor: "border-blue-500/20", iconBg: "from-blue-500/20 to-blue-600/20" },
          { label: "Active Orders", value: "2", icon: "📦", trend: "+1", bgColor: "from-neutral-900/95 to-neutral-950/95", borderColor: "border-cyan-500/20", iconBg: "from-cyan-500/20 to-cyan-600/20" },
          { label: "Saved Items", value: "8", icon: "⭐", trend: "+3", bgColor: "from-neutral-900/95 to-neutral-950/95", borderColor: "border-purple-500/20", iconBg: "from-purple-500/20 to-purple-600/20" },
          { label: "Total Orders", value: "15", icon: "✅", trend: "+5", bgColor: "from-neutral-900/95 to-neutral-950/95", borderColor: "border-amber-500/20", iconBg: "from-amber-500/20 to-amber-600/20" },
        ].map((stat, idx) => {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={cn(
                "relative rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 transition-all cursor-pointer group overflow-hidden",
                stat.bgColor,
                stat.borderColor
              )}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon and Trend */}
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "p-3 rounded-xl bg-gradient-to-br",
                    stat.iconBg
                  )}>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30"
                  >
                    {stat.trend}
                  </motion.span>
                </div>

                {/* Label and Value */}
                <div>
                  <p className="text-neutral-400 text-sm mb-2 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders & Spending Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 group transition-all overflow-hidden hover:border-blue-500/30"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Recent Orders
            </h3>
            <div className="space-y-3">
              {buyerOrders.slice(0, 3).map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-transparent hover:border-blue-400/40 hover:from-blue-500/20 transition-all cursor-pointer group/item"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm line-clamp-1 group-hover/item:text-blue-300 transition-colors text-neutral-200">{order.title}</p>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap ml-2",
                      order.status === "delivered"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : order.status === "shipped"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-amber-500/20 text-amber-300"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 gap-2">
                    <span>{order.date}</span>
                    <span className="text-blue-300 font-semibold">₹{(order.amount / 1000).toFixed(0)}K</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 group transition-all overflow-hidden hover:border-purple-500/30"
        >
          {/* Glowing orbs */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Monthly Spending Analytics
              </h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/50" />
                  <span className="text-neutral-400">Spending</span>
                </div>
              </div>
            </div>

            <div className="relative w-full rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/20 p-6 backdrop-blur-sm shadow-inner">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={buyerSpendingData}
                  margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="gradBuyerSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                      <stop offset="50%" stopColor="#7c3aed" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="gradBuyerSpendingAlt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                      <stop offset="50%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6}/>
                    </linearGradient>
                    <filter id="buyerBarGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(139, 92, 246, 0.1)"
                    vertical={false}
                    strokeWidth={1}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="rgba(139, 92, 246, 0.5)"
                    style={{ fontSize: "13px", fontWeight: "600" }}
                    tick={{ fill: "rgba(255,255,255,0.6)" }}
                  />
                  <YAxis
                    stroke="rgba(139, 92, 246, 0.5)"
                    style={{ fontSize: "13px", fontWeight: "600" }}
                    tick={{ fill: "rgba(255,255,255,0.6)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 15, 25, 0.95)",
                      border: "2px solid rgba(139, 92, 246, 0.5)",
                      borderRadius: "16px",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                      padding: "12px"
                    }}
                    cursor={{ fill: "rgba(139, 92, 246, 0.1)", radius: 8 }}
                    labelStyle={{ color: "#e9d5ff", fontWeight: "bold", marginBottom: "8px" }}
                    itemStyle={{ color: "#fff", fontWeight: "600" }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#gradBuyerSpending)"
                    radius={[12, 12, 0, 0]}
                    filter="url(#buyerBarGlow)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Browse Marketplace", icon: "🛒", color: "blue" },
          { label: "Track Orders", icon: "📦", color: "purple" },
          { label: "View Saved Items", icon: "⭐", color: "amber" },
        ].map((action, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-2xl border backdrop-blur-xl p-6 transition-all cursor-pointer group overflow-hidden text-left",
              action.color === "blue" && "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:border-blue-400/60",
              action.color === "purple" && "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:border-purple-400/60",
              action.color === "amber" && "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-500/5 hover:border-amber-400/60"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{action.icon}</span>
              <span className="font-semibold text-neutral-200 group-hover:text-blue-300 transition-colors">
                {action.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function BuyerOrders() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
        My Orders
      </h2>

      <div className="grid gap-4">
        {buyerOrders.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.01, y: -4 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-6 hover:border-blue-500/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-neutral-50">{order.title}</h3>
                  <p className="text-sm text-neutral-400">Seller: {order.seller}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span>📅 {order.date}</span>
                  <span>📦 {order.tracking}</span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-2xl font-bold text-blue-300">₹{(order.amount / 1000).toFixed(0)}K</p>
                <span className={cn(
                  "px-4 py-1.5 rounded-xl text-xs font-semibold",
                  order.status === "delivered"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    : order.status === "shipped"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                )}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BuyerSpending() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
        Spending Analytics
      </h2>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Spent", value: "₹10L", icon: "💳", color: "blue" },
          { label: "Orders This Month", value: "3", icon: "📦", color: "purple" },
          { label: "Saved (Deals)", value: "₹2.5L", icon: "💰", color: "emerald" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn(
              "relative rounded-2xl border backdrop-blur-xl p-6 transition-all cursor-pointer group overflow-hidden",
              stat.color === "blue" && "border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-500/5 hover:border-blue-400/60",
              stat.color === "purple" && "border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-500/5 hover:border-purple-400/60",
              stat.color === "emerald" && "border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 hover:border-emerald-400/60"
            )}
          >
            <div className="space-y-4">
              <span className="text-4xl">{stat.icon}</span>
              <div>
                <p className="text-neutral-400 text-sm mb-1 font-medium">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl border border-purple-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden hover:border-purple-500/40 transition-all"
        >
          {/* Background glow */}
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  Monthly Spending Trend
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Track your expenses over time</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs font-semibold text-purple-300">+15%</span>
              </div>
            </div>

            <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 p-6 backdrop-blur-sm">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={buyerSpendingData} margin={{ top: 20, right: 25, left: 20, bottom: 10 }}>
                  <defs>
                    {/* Enhanced glass-like gradient area fill with multiple stops */}
                    <linearGradient id="buyerSpendingAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5}/>
                      <stop offset="15%" stopColor="#9f7aea" stopOpacity={0.4}/>
                      <stop offset="35%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="55%" stopColor="#7c3aed" stopOpacity={0.2}/>
                      <stop offset="75%" stopColor="#6d28d9" stopOpacity={0.1}/>
                      <stop offset="100%" stopColor="#5b21b6" stopOpacity={0}/>
                    </linearGradient>
                    {/* Smooth gradient for line stroke */}
                    <linearGradient id="buyerLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#c4b5fd"/>
                      <stop offset="33%" stopColor="#a78bfa"/>
                      <stop offset="66%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#7c3aed"/>
                    </linearGradient>
                    {/* Glass polish effect - subtle shine */}
                    <linearGradient id="glassShine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15}/>
                      <stop offset="50%" stopColor="#ffffff" stopOpacity={0.05}/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke="rgba(139, 92, 246, 0.05)"
                    vertical={false}
                    horizontal={true}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="transparent"
                    style={{ fontSize: "11px", fontWeight: "500" }}
                    tick={{ fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="transparent"
                    style={{ fontSize: "11px", fontWeight: "500" }}
                    tick={{ fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    width={40}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-neutral-900/90 backdrop-blur-xl border border-purple-400/30 rounded-xl px-4 py-3 shadow-2xl shadow-purple-500/20">
                            <p className="text-purple-300 font-medium text-sm mb-1">{label}</p>
                            <p className="text-white font-bold text-lg">
                              ₹{(payload[0].value / 1000).toFixed(0)}K
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={false}
                  />
                  <Line
                    type="natural"
                    dataKey="amount"
                    stroke="url(#buyerLineGrad)"
                    strokeWidth={3.5}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#a78bfa",
                      stroke: "#fff",
                      strokeWidth: 2.5
                    }}
                    fill="url(#buyerSpendingAreaGrad)"
                    isAnimationActive={true}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Category Distribution - Redesigned without Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-3xl border border-purple-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden hover:border-purple-500/40 transition-all"
        >
          {/* Animated glow orb */}
          <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Category Distribution
            </h3>

            <div className="space-y-5">
              {buyerCategorySpending.map((cat, idx) => {
                const total = buyerCategorySpending.reduce((sum, item) => sum + item.value, 0);
                const percentage = Math.round((cat.value / total) * 100);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-100">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-400">₹{(cat.value / 1000).toFixed(0)}K</span>
                        <motion.span
                          className="text-xl font-bold"
                          style={{ color: cat.color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.08, type: "spring" }}
                        >
                          {percentage}%
                        </motion.span>
                      </div>
                    </div>

                    <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
                      {/* Background glow */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5 + idx * 0.08, duration: 1, ease: "easeOut" }}
                        className="absolute inset-0 blur-md"
                        style={{
                          backgroundColor: cat.color,
                          opacity: 0.5
                        }}
                      />
                      {/* Solid bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5 + idx * 0.08, duration: 1, ease: "easeOut" }}
                        className="relative h-full rounded-full shadow-lg"
                        style={{
                          backgroundColor: cat.color,
                          boxShadow: `0 0 20px ${cat.color}80, inset 0 1px 0 rgba(255,255,255,0.3)`
                        }}
                      >
                        {/* Glass shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
                <p className="text-xs text-neutral-400 font-medium">Total spending across all categories</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BuyerSaved() {
  const savedItems = [
    { id: 1, title: "Premium MacBook Pro Parts - 30 Units", seller: "TechRecycle Pro", price: 95000, image: "💻" },
    { id: 2, title: "iPhone 12 Components - 200 Units", seller: "GreenTech Solutions", price: 150000, image: "📱" },
    { id: 3, title: "Server Grade SSDs - 100 Units", seller: "DataCenter Recyclers", price: 280000, image: "💾" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Saved Items
        </h2>
        <span className="text-sm text-neutral-400">{savedItems.length} items saved</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {savedItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-6 hover:border-blue-500/40 transition-all group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-5xl">{item.image}</span>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl"
                >
                  ⭐
                </motion.button>
              </div>

              <div>
                <h3 className="font-bold text-base text-neutral-50 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">by {item.seller}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xl font-bold text-blue-300">
                  ₹{(item.price / 1000).toFixed(0)}K
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold shadow-lg shadow-blue-500/30"
                >
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center py-8 border-t border-white/10"
      >
        <p className="text-neutral-400 mb-4">Want to find more items?</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
        >
          Explore Marketplace
        </motion.button>
      </motion.div>
    </div>
  );
}
