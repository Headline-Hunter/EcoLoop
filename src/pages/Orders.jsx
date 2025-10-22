import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES } from '../routes';
import SharedHeader from '../components/SharedHeader';
import { AuthContext } from '../contexts/AuthContext';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2024-001",
    title: "MacBook Pro 2019 Parts - 15 Units",
    seller: "TechRecycle Pro",
    amount: 95000,
    orderDate: "Oct 18, 2024",
    estimatedDelivery: "Oct 25, 2024",
    status: "in_transit",
    currentLocation: "Mumbai Distribution Center",
    tracking: "TRK1234567890",
    items: 15,
    weight: "45 kg",
    timeline: [
      { status: "Order Placed", date: "Oct 18, 10:30 AM", completed: true, icon: "📝" },
      { status: "Payment Confirmed", date: "Oct 18, 10:32 AM", completed: true, icon: "💳" },
      { status: "Seller Processing", date: "Oct 18, 2:45 PM", completed: true, icon: "📦" },
      { status: "Picked Up", date: "Oct 19, 9:15 AM", completed: true, icon: "🚚" },
      { status: "In Transit", date: "Oct 20, 3:20 PM", completed: true, icon: "🚛", current: true },
      { status: "Out for Delivery", date: "Oct 25", completed: false, icon: "🏃" },
      { status: "Delivered", date: "Oct 25", completed: false, icon: "✅" },
    ]
  },
  {
    id: "ORD-2024-002",
    title: "Server RAM DDR4 - 200 Sticks",
    seller: "Green Electronics",
    amount: 180000,
    orderDate: "Oct 15, 2024",
    estimatedDelivery: "Oct 22, 2024",
    status: "out_for_delivery",
    currentLocation: "Local Delivery Hub - Delhi",
    tracking: "TRK0987654321",
    items: 200,
    weight: "12 kg",
    timeline: [
      { status: "Order Placed", date: "Oct 15, 11:20 AM", completed: true, icon: "📝" },
      { status: "Payment Confirmed", date: "Oct 15, 11:22 AM", completed: true, icon: "💳" },
      { status: "Seller Processing", date: "Oct 15, 3:30 PM", completed: true, icon: "📦" },
      { status: "Picked Up", date: "Oct 16, 8:00 AM", completed: true, icon: "🚚" },
      { status: "In Transit", date: "Oct 18, 1:15 PM", completed: true, icon: "🚛" },
      { status: "Out for Delivery", date: "Oct 22, 7:30 AM", completed: true, icon: "🏃", current: true },
      { status: "Delivered", date: "Today by 6 PM", completed: false, icon: "✅" },
    ]
  },
  {
    id: "ORD-2024-003",
    title: "Dell Laptop Batch - 25 Units",
    seller: "EcoRefurb Solutions",
    amount: 125000,
    orderDate: "Oct 10, 2024",
    estimatedDelivery: "Oct 17, 2024",
    status: "delivered",
    currentLocation: "Delivered",
    tracking: "TRK5555666677",
    items: 25,
    weight: "62 kg",
    timeline: [
      { status: "Order Placed", date: "Oct 10, 9:45 AM", completed: true, icon: "📝" },
      { status: "Payment Confirmed", date: "Oct 10, 9:47 AM", completed: true, icon: "💳" },
      { status: "Seller Processing", date: "Oct 10, 1:20 PM", completed: true, icon: "📦" },
      { status: "Picked Up", date: "Oct 11, 10:30 AM", completed: true, icon: "🚚" },
      { status: "In Transit", date: "Oct 13, 4:00 PM", completed: true, icon: "🚛" },
      { status: "Out for Delivery", date: "Oct 17, 8:00 AM", completed: true, icon: "🏃" },
      { status: "Delivered", date: "Oct 17, 2:30 PM", completed: true, icon: "✅", current: true },
    ]
  },
];

const statusConfig = {
  in_transit: {
    label: "In Transit",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-300"
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/40",
    textColor: "text-amber-300"
  },
  delivered: {
    label: "Delivered",
    color: "from-emerald-500 to-green-500",
    bgColor: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-300"
  },
  processing: {
    label: "Processing",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/40",
    textColor: "text-purple-300"
  }
};

export default function Orders() {
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "in_transit", label: "In Transit", count: 1 },
    { id: "out_for_delivery", label: "Out for Delivery", count: 1 },
    { id: "delivered", label: "Delivered", count: 1 },
  ];

  const filteredOrders = activeFilter === "all"
    ? orders
    : orders.filter(order => order.status === activeFilter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <SharedHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Track Your Orders 📦
          </h1>
          <p className="text-lg text-neutral-400">
            Real-time tracking and delivery updates for all your purchases
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2"
        >
          {filters.map((filter, idx) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "px-5 py-3 rounded-xl font-semibold text-sm border backdrop-blur-xl transition-all whitespace-nowrap",
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/60 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20 hover:text-neutral-200"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs font-bold",
                activeFilter === filter.id
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-neutral-400"
              )}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-18rem)]">
          {/* Orders List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-4 h-[calc(100vh-18rem)] overflow-y-auto pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(59, 130, 246, 0.5) transparent'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order, idx) => {
                const config = statusConfig[order.status];
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedOrder(order)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={cn(
                      "relative rounded-2xl border backdrop-blur-xl p-5 cursor-pointer transition-all overflow-hidden group",
                      selectedOrder?.id === order.id
                        ? `bg-gradient-to-br ${config.bgColor} ${config.borderColor} shadow-lg`
                        : "bg-neutral-900/60 border-white/10 hover:border-white/20"
                    )}
                  >
                    {/* Gradient overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      config.bgColor
                    )} />

                    <div className="relative z-10">
                      {/* Order ID and Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-neutral-400">{order.id}</span>
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold border",
                          `bg-gradient-to-r ${config.color} text-white border-white/20`
                        )}>
                          {config.label}
                        </span>
                      </div>

                      {/* Order Title */}
                      <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm">
                        {order.title}
                      </h3>

                      {/* Order Details */}
                      <div className="space-y-1.5 text-xs text-neutral-400">
                        <div className="flex items-center gap-2">
                          <span>🏢</span>
                          <span>{order.seller}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💰</span>
                          <span className="font-semibold text-blue-300">₹{(order.amount / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span className="line-clamp-1">{order.currentLocation}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {selectedOrder && (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-3xl border border-blue-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl p-8 overflow-hidden"
                >
                  {/* Animated background orbs */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                  <div className="relative z-10 space-y-8">
                    {/* Order Header */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">
                            {selectedOrder.title}
                          </h2>
                          <p className="text-sm text-neutral-400 font-mono">{selectedOrder.tracking}</p>
                        </div>
                        <div className={cn(
                          "px-4 py-2 rounded-xl text-sm font-bold border shadow-lg",
                          `bg-gradient-to-r ${statusConfig[selectedOrder.status].color} text-white border-white/20`
                        )}>
                          {statusConfig[selectedOrder.status].label}
                        </div>
                      </div>

                      {/* Order Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Order Date", value: selectedOrder.orderDate, icon: "📅" },
                          { label: "Est. Delivery", value: selectedOrder.estimatedDelivery, icon: "🚚" },
                          { label: "Items", value: `${selectedOrder.items} units`, icon: "📦" },
                          { label: "Weight", value: selectedOrder.weight, icon: "⚖️" },
                        ].map((info, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{info.icon}</span>
                              <p className="text-xs text-neutral-400">{info.label}</p>
                            </div>
                            <p className="text-sm font-semibold text-white">{info.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div>
                      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                        Shipment Timeline
                      </h3>

                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-neutral-700/20" />

                        <div className="space-y-6">
                          {selectedOrder.timeline.map((step, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              className="relative flex gap-4"
                            >
                              {/* Timeline dot */}
                              <div className="relative z-10 flex-shrink-0">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                                  className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 backdrop-blur-xl",
                                    step.completed
                                      ? step.current
                                        ? "bg-gradient-to-br from-blue-500/40 to-purple-500/40 border-blue-400 shadow-lg shadow-blue-500/50"
                                        : "bg-emerald-500/20 border-emerald-400"
                                      : "bg-neutral-800/50 border-neutral-700"
                                  )}
                                >
                                  {step.icon}

                                  {/* Pulse animation for current step */}
                                  {step.current && (
                                    <motion.div
                                      className="absolute inset-0 rounded-2xl bg-blue-500/20"
                                      animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0, 0.5]
                                      }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                </motion.div>
                              </div>

                              {/* Step content */}
                              <div className={cn(
                                "flex-1 pb-6 pt-2",
                                step.current && "animate-pulse"
                              )}>
                                <h4 className={cn(
                                  "font-semibold mb-1",
                                  step.completed
                                    ? step.current
                                      ? "text-blue-300"
                                      : "text-white"
                                    : "text-neutral-500"
                                )}>
                                  {step.status}
                                  {step.current && (
                                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                      Current
                                    </span>
                                  )}
                                </h4>
                                <p className="text-sm text-neutral-400">{step.date}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                      >
                        📞 Contact Seller
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        ℹ️ Get Help
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <style jsx>{`
        .lg\\:col-span-1::-webkit-scrollbar {
          width: 8px;
        }
        .lg\\:col-span-1::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .lg\\:col-span-1::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .lg\\:col-span-1::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
