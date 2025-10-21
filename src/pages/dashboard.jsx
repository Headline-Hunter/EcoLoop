import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES, ROUTE_CONFIG } from '../routes';
import SharedHeader from '../components/SharedHeader';

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

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const dashboardTabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "listings", label: "My Listings", icon: "📦" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "transactions", label: "Transactions", icon: "💰" },
];

function GradientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-fuchsia-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl" style={{ animationDelay: '1s' }} />
    </div>
  );
}

export default function Dashboard() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <GradientGlow />

      {/* Header - Same as other pages */}
      <SharedHeader className="sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/80 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              onClick={() => navigate(ROUTES.LANDING)}
              className="flex items-center gap-3 hover:opacity-80"
            >
              <div className="h-11 w-11 grid place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border border-emerald-300/40 shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-bold">♻</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">EcoLoop</div>
                <div className="hidden sm:block text-xs text-neutral-400">B2B E‑waste Marketplace</div>
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
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {route === ROUTES.DASHBOARD && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-400/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-sm">
                <span className="text-2xl">🏢</span>
                <div>
                  <div className="font-semibold">TechRecycle Pro</div>
                  <div className="text-xs text-neutral-400">seller@example.com</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(ROUTES.LANDING)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Sign Out
              </motion.button>
              <button
                onClick={() => navigate(ROUTES.SELL)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
              >
                <span>✨</span>
                <span>List Item</span>
              </button>
            </div>
          </div>
        </div>
      </SharedHeader>

      {/* Dashboard Tabs - Below header */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {dashboardTabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap flex-shrink-0",
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
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
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "listings" && <ListingsTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "transactions" && <TransactionsTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-emerald-400/10 border border-emerald-300/30">
                <span className="text-lg">♻</span>
              </div>
              <div>
                <div className="font-semibold">EcoLoop</div>
                <div className="text-sm text-neutral-400">Closing the loop on electronics</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <a className="hover:text-emerald-400 transition-colors" href="#">Terms</a>
              <a className="hover:text-emerald-400 transition-colors" href="#">Privacy</a>
              <a className="hover:text-emerald-400 transition-colors" href="#">Help</a>
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

function OverviewTab() {
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
            Welcome back, TechRecycle Pro!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-300"
          >
            Here's your selling performance overview
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Sales", value: "₹12.5L", icon: "💰", trend: "+15%", color: "emerald" },
          { label: "Active Listings", value: "12", icon: "📦", trend: "+3", color: "cyan" },
          { label: "Total Listings", value: "24", icon: "📊", trend: "+8", color: "purple" },
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
        <BarChartComponent />
        <CategoryStatsComponent />
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
              Top Listings
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

function BarChartComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden group hover:border-emerald-500/30 transition-all"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          Revenue vs Orders
        </h3>

        <div className="w-full rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={analyticsData}
              margin={{ top: 20, right: 20, left: -5, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" style={{ fontSize: "12px" }} />
              <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)"
                }}
                cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
                labelStyle={{ color: "#e0e7ff" }}
              />
              <Bar dataKey="sales" fill="url(#gradRevenue)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="url(#gradOrders)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryStatsComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8 overflow-hidden group hover:border-cyan-500/30 transition-all"
    >
      <div className="relative z-10 space-y-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Category Breakdown
        </h3>

        <div className="space-y-3">
          {categoryData.map((cat, idx) => {
            const percentage = cat.value;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.08 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium text-neutral-200">{cat.name}</span>
                  </div>
                  <span className="font-bold text-emerald-300">{percentage}%</span>
                </div>

                <div className="relative h-2.5 bg-white/5 rounded-full border border-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.4 + idx * 0.08, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-neutral-400">Total inventory distribution across all categories</p>
        </div>
      </div>
    </motion.div>
  );
}

function ListingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Listings</h2>
      <div className="grid gap-4">
        {mockListings.map((listing, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-6 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-neutral-50">{listing.title}</h3>
                <p className="text-sm text-neutral-400">👁 {listing.views} • 💬 {listing.offers}</p>
              </div>
              <p className="text-2xl font-bold text-emerald-300">₹{(listing.price / 1000).toFixed(0)}K</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={analyticsData} margin={{ top: 20, right: 20, left: -5, bottom: 20 }}>
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" />
          <YAxis stroke="rgba(255,255,255,0.4)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)"
            }}
            labelStyle={{ color: "#e0e7ff" }}
          />
          <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

function TransactionsTab() {
  return (
    <div className="space-y-6">
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