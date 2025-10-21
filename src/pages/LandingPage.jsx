import React, { useState } from "react";
import SharedHeader from '../components/SharedHeader';
import AuthModal from '../components/AuthModal';
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigation } from '../hooks/useNavigation.jsx';
import { ROUTES, ROUTE_CONFIG } from '../routes';

const revenueData = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 18 },
  { month: "Apr", value: 15 },
  { month: "May", value: 22 },
  { month: "Jun", value: 27 },
  { month: "Jul", value: 31 },
  { month: "Aug", value: 29 },
  { month: "Sep", value: 35 },
  { month: "Oct", value: 41 },
];

const faqData = [
  {
    question: "What Qualifies As E-Waste?",
    answer: "E-waste includes any discarded electronic equipment like computers, laptops, smartphones, televisions, washing machines, refrigerators, and other electrical appliances that are no longer functional or wanted. These items contain valuable materials like gold, copper, and aluminum, as well as hazardous substances that require proper handling.",
  },
  {
    question: "What is IT Hardware Destruction?",
    answer: "IT hardware destruction is the secure and certified process of physically destroying old computer equipment, servers, and storage devices. This ensures complete data destruction and prevents data breaches while recovering valuable metals. EcoLoop partners with certified recyclers to guarantee safe destruction with proper documentation.",
  },
  {
    question: "What is E-Waste Data Destruction & Why is it Important?",
    answer: "E-waste data destruction permanently removes sensitive information from electronic devices before recycling. This is critical for businesses and individuals to prevent data theft and identity fraud. Proper data destruction ensures compliance with regulations like GDPR and protects confidential information from being recovered.",
  },
  {
    question: "What is the Importance of Corporate E-Waste Recycling?",
    answer: "Corporate e-waste recycling helps companies reduce environmental impact, ensure data security, recover valuable materials, and maintain regulatory compliance. It demonstrates corporate responsibility while generating revenue from recovered metals and components, making it economically and ethically beneficial.",
  },
  {
    question: "Why would a company or an Individual Want to Destroy a Hard Disk?",
    answer: "Hard disk destruction is essential to prevent unauthorized data recovery. Deleted files can often be restored using recovery software, making physical destruction the only secure method. This protects business secrets, personal information, financial records, and prevents costly data breaches and legal complications.",
  },
  {
    question: "How Can We Safely Dispose E-Waste?",
    answer: "Safe e-waste disposal involves: (1) Using certified recyclers who follow proper protocols, (2) Data destruction before recycling, (3) Segregating components for proper recovery, (4) Following local environmental regulations, (5) Obtaining proper documentation. EcoLoop connects you with verified recyclers ensuring safe, compliant disposal.",
  },
  {
    question: "Why is E-Waste Management Important?",
    answer: "E-waste management is crucial because improper disposal contaminates soil and water with toxic materials like lead and mercury. It's important for environmental protection, resource conservation, and recovering valuable materials. Proper management also creates economic value through material recovery and supports the circular economy.",
  },
  {
    question: "Where is the E-Waste Collection Center in Bangalore?",
    answer: "EcoLoop provides pickup services across Bangalore with 24-hour service in metros. We collect e-waste directly from your location through our logistics partners. You can book a pickup through our platform or visit authorized collection points. Check our marketplace for nearest collection centers.",
  },
  {
    question: "What Can I Sell / Recycle E-Waste?",
    answer: "You can sell or recycle laptops, desktops, smartphones, tablets, washing machines, refrigerators, televisions, printers, servers, networking equipment, and other electronic devices. Items can be working units for refurbishment or scrap for recovery. List your items on EcoLoop to get instant quotes.",
  },
  {
    question: "What Brands Can I Re-Sell / Recycle Old Electronics?",
    answer: "EcoLoop accepts electronics from all major brands including Dell, HP, Lenovo, Apple, Samsung, Sony, LG, Whirlpool, Godrej, and many others. Both branded and local brand electronics are welcome. Working units are refurbished and resold, while damaged units are recycled for material recovery.",
  },
];

const chatSampleQuestions = [
  "How do I list my e-waste?",
  "What items can I recycle?",
  "How much will I get for my laptop?",
  "How does pickup work?",
  "Is my data safe?",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingPage() {
  const [active, setActive] = useState(ROUTES.LANDING);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleNavigation = (page) => {
    setActive(page);
  };

  return (
    <>
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(8px);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: rgba(52, 211, 153, 0.3);
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.3);
        }
      `}</style>
      <Shell
        active={active}
        onChange={handleNavigation}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />
    </>
  );
}

function Shell({ active, onChange, showAuthModal, setShowAuthModal }) {
  const [chatOpen, setChatOpen] = useState(false);
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <GradientGlow />
      <SharedHeader className="sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/80 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              onClick={() => {
                onChange(ROUTES.LANDING);
                navigate(ROUTES.LANDING);
              }}
              className="flex items-center gap-3 hover:opacity-80"
            >
              <div className="h-11 w-11 grid place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border border-emerald-300/40 shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-bold">♻</span>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">EcoLoop</div>
                <div className="hidden sm:block text-xs text-neutral-400">B2B E-waste Marketplace</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-2">
              {Object.entries(ROUTES).map(([key, route]) => {
                const config = ROUTE_CONFIG[route];
                if (!config?.showInNav) return null;

                return (
                  <button
                    key={route}
                    onClick={() => {
                      onChange(route);
                      navigate(route);
                    }}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      active === route
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {active === route && (
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
              >
                <span>✨</span>
                <span>List Item</span>
              </button>
            </div>
          </div>
        </div>
      </SharedHeader>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {active === ROUTES.LANDING && (
              <Home
                onNavigate={onChange}
                setShowAuthModal={setShowAuthModal}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

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

      <Chatbot isOpen={chatOpen} onToggle={setChatOpen} />

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
    </div>
  );
}

function GradientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-fuchsia-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl" />
    </div>
  );
}

function Home({ onNavigate, setShowAuthModal }) {
  return (
    <section className="space-y-16">
      <Hero onNavigate={onNavigate} setShowAuthModal={setShowAuthModal} />
      <Calculator />
      <USPGrid />
      <QuickActions onNavigate={onNavigate} />
      <FAQ />
    </section>
  );
}

function Hero({ onNavigate, setShowAuthModal }) {
  const { navigate } = useNavigation();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-8 sm:p-12 lg:p-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur-sm"
          >
            <span>✓</span>
            Verified B2B E-waste Trading Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Buy & Sell Electronics Scrap
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              with Transparent Recovery Data
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-neutral-300 leading-relaxed max-w-2xl"
          >
            EcoLoop connects college labs, refurbishers, and recyclers in a trusted marketplace. List scrap lots with estimated metal recovery, or source working spares — all in one secure platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <button
              onClick={() => {
                onNavigate(ROUTES.MARKETPLACE);
                navigate(ROUTES.MARKETPLACE);
              }}
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold shadow-xl shadow-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105"
            >
              <span>🔍</span>
              <span>Explore Marketplace</span>
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              <span>➕</span>
              <span>List Your Lot</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 pt-4 text-sm text-neutral-400"
          >
            <span className="inline-flex items-center gap-2">
              <div className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10">
                <span>⏱</span>
              </div>
              24h pickup in metros
            </span>
            <span className="inline-flex items-center gap-2">
              <div className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10">
                <span>📍</span>
              </div>
              Pan-India logistics
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PreviewCard />
        </motion.div>
      </div>
    </div>
  );
}

function PreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-8 backdrop-blur-xl shadow-2xl"
    >
      <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-neutral-400">Sample Listing</div>
            <div className="text-xl font-bold">Laptop Motherboard</div>
          </div>
          <div className="rounded-xl border border-emerald-300/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            pcb-001
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-neutral-400 mb-2">Est. Recovery</div>
            <div className="text-lg font-bold text-emerald-300">Gold 0.25g</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-neutral-400 mb-2">Copper</div>
            <div className="text-lg font-bold text-cyan-300">120g</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-neutral-400 mb-2">Price</div>
            <div className="text-lg font-bold">₹1,450</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-neutral-400 mb-2">Location</div>
            <div className="text-lg font-bold">Bengaluru</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 text-sm text-neutral-300">
          Heat-stressed motherboard from Dell 5590; ideal for precious metal recovery.
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 px-6 py-3 text-sm font-semibold text-emerald-200 hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all">
          View Details
        </button>
      </div>
    </motion.div>
  );
}

function Calculator() {
  const [selectedType, setSelectedType] = useState("laptop");
  const [selectedSpec, setSelectedSpec] = useState(0);

  const calculatorData = {
    laptop: {
      name: "Laptop",
      specs: [
        { label: "13\" Basic", value: 1200, recovery: "Gold 0.1g, Copper 80g" },
        { label: "15\" Mid-Range", value: 1800, recovery: "Gold 0.2g, Copper 120g" },
        { label: "17\" High-End", value: 2400, recovery: "Gold 0.35g, Copper 180g" },
      ],
    },
    washingmachine: {
      name: "Washing Machine",
      specs: [
        { label: "5-6 kg", value: 1500, recovery: "Copper 300g, Steel 2kg" },
        { label: "7-8 kg", value: 2200, recovery: "Copper 450g, Steel 3kg" },
        { label: "9+ kg", value: 3000, recovery: "Copper 600g, Steel 4.5kg" },
      ],
    },
    fridge: {
      name: "Refrigerator",
      specs: [
        { label: "Single Door", value: 2800, recovery: "Copper 500g, Aluminum 1.5kg" },
        { label: "Double Door", value: 4200, recovery: "Copper 800g, Aluminum 2.5kg" },
        { label: "Side-by-Side", value: 5500, recovery: "Copper 1kg, Aluminum 3.5kg" },
      ],
    },
  };

  const current = calculatorData[selectedType];
  const spec = current.specs[selectedSpec];
  const profitMargin = 1.35;
  const estimatedValue = Math.round(spec.value * profitMargin);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 p-8 backdrop-blur-sm"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">💰 Quick Value Calculator</h3>
        <p className="text-neutral-400">Estimate how much you can get for your e-waste</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">Select Item Type</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(calculatorData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedType(key);
                    setSelectedSpec(0);
                  }}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    selectedType === key
                      ? "bg-emerald-500/30 border border-emerald-300/40 text-emerald-200"
                      : "border border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">Select Specification</label>
            <div className="space-y-2">
              {current.specs.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpec(idx)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 text-left text-sm transition-all border",
                    selectedSpec === idx
                      ? "bg-cyan-500/20 border-cyan-300/40"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  <div className="font-medium">{spec.label}</div>
                  <div className="text-xs text-neutral-400 mt-1">Base: ₹{spec.value.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-300/40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-emerald-200 mb-2">Base Value</div>
              <div className="text-4xl font-bold">₹{spec.value.toLocaleString()}</div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="text-sm text-emerald-200 mb-2">Estimated Value (35% profit margin)</div>
              <div className="text-5xl font-bold text-emerald-300">₹{estimatedValue.toLocaleString()}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400 mb-2">Recovery Estimate</div>
              <div className="text-sm text-neutral-200">{spec.recovery}</div>
            </div>

            <button className="w-full rounded-xl bg-emerald-500 text-emerald-950 py-3 font-semibold hover:bg-emerald-400 transition-all">
              Get Exact Quote
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function USPGrid() {
  const items = [
    { title: "Price Transparency", desc: "Recovery estimates and market references build trust into every trade with data-backed pricing.", color: "emerald" },
    { title: "Verified Sellers", desc: "KYB checks and built-in dispute resolution keep all transactions clean and secure.", color: "cyan" },
    { title: "Smart Logistics", desc: "Optimized pickup routing with weight slips and complete chain-of-custody documentation.", color: "purple" },
  ];

  const colorMap = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/30",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-400/30",
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ title, desc, color }) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6, scale: 1.02 }}
          className={cn(
            "rounded-3xl border bg-gradient-to-br p-8 backdrop-blur-sm shadow-lg transition-all hover:shadow-2xl",
            colorMap[color]
          )}
        >
          <div className="mb-6 text-3xl">💡</div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-neutral-300">{desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function QuickActions({ onNavigate }) {
  const { navigate } = useNavigation();

  const actions = [
    { route: ROUTES.MARKETPLACE, label: "Browse Listings", desc: "Discover verified lots and quality spare parts" },
    { route: ROUTES.SELL, label: "Create Listing", desc: "Post scrap materials or working components" },
    { route: ROUTES.DASHBOARD, label: "View Analytics", desc: "Track your recovery value and sales performance" },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 p-8 backdrop-blur-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Quick Actions</h3>
        <p className="text-sm text-neutral-400 mt-1">Get started with these common tasks</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {actions.map(({ route, label, desc }) => (
          <motion.button
            key={route}
            onClick={() => {
              onNavigate(route);
              navigate(route);
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 text-left transition-all hover:border-white/20 hover:shadow-xl"
          >
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl">📦</div>
                <span>→</span>
              </div>
              <div>
                <div className="font-bold text-lg">{label}</div>
                <p className="text-sm text-neutral-400 mt-2">{desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 p-8 backdrop-blur-sm"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
        <p className="text-neutral-400">Find answers to common questions about e-waste recycling</p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left"
            >
              <span className="font-medium text-neutral-200">{item.question}</span>
              <span className={cn("transition-transform", openIdx === idx ? "rotate-180" : "")}>▼</span>
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 px-6 py-4 bg-white/3"
                >
                  <p className="text-neutral-300 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: "Hey! How can I help you today? Ask me anything about e-waste recycling." }
  ]);
  const [input, setInput] = useState("");
  const chatRef = React.useRef(null);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: "user", text }]);
    setInput("");

    setTimeout(() => {
      const responses = {
        "list": "To list your e-waste, go to 'Sell' section, fill in item details, recovery estimates, and upload photos. Our team will verify and list it within 24 hours!",
        "recycle": "We accept laptops, phones, tablets, washing machines, fridges, TVs, printers, servers, and more. Both working and damaged items qualify.",
        "laptop": "For a basic 13\" laptop, you can expect around 1,200-2,400 rupees depending on condition. Use our calculator to get exact estimates!",
        "pickup": "We offer 24-hour pickup in metros and within 3-5 days in other areas. Book through our app and we'll handle logistics.",
        "data": "Your data is completely safe! We ensure secure data destruction before recycling. All our partners are certified and follow strict protocols.",
      };

      const keywords = text.toLowerCase();
      let response = "That's a great question! I'd love to help. Could you be more specific? Ask about listing, recycling items, pricing, pickup, or data safety.";

      for (const [key, value] of Object.entries(responses)) {
        if (keywords.includes(key)) {
          response = value;
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: "bot", text: response }]);
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          onClick={() => onToggle(true)}
          className="fixed bottom-8 right-8 z-50 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/60 flex items-center justify-center text-4xl hover:shadow-emerald-500/80 transition-all"
        >
          💭
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-50 w-full sm:w-[520px] h-[700px] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-emerald-500/30"
          >
            <div className="absolute inset-0 bg-neutral-950 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 border-b border-emerald-400/40 px-6 py-5 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div className="font-semibold text-base text-white">EcoLoop Assistant</div>
              </div>
              <button
                onClick={() => onToggle(false)}
                className="text-white/50 hover:text-white text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(16, 185, 129, 0.2) transparent'
            }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className={cn(
                    "flex gap-3",
                    msg.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.type === "bot" && (
                    <div className="text-xl">🤖</div>
                  )}
                  <div
                    className={cn(
                      "max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium",
                      msg.type === "user"
                        ? "bg-gradient-to-br from-emerald-500/50 to-cyan-500/40 text-white rounded-br-none shadow-lg shadow-emerald-500/20"
                        : "bg-white/12 text-neutral-100 rounded-bl-none border border-white/15"
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="relative z-10 border-t border-emerald-500/20 px-5 py-4 backdrop-blur-md bg-gradient-to-b from-transparent to-neutral-950/40">
              <div className="text-xs text-neutral-400 mb-3 font-semibold uppercase tracking-wide">Quick questions</div>
              <div className="grid grid-cols-2 gap-2">
                {chatSampleQuestions.map((q, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSendMessage(q)}
                    className="text-left text-xs px-4 py-3 rounded-lg border border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 hover:border-emerald-400/60 transition-all font-medium text-emerald-100"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-emerald-500/20 p-5 backdrop-blur-md bg-gradient-to-t from-neutral-950 to-transparent">
              <div className="flex gap-3 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-xl border border-emerald-400/40 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/40 outline-none placeholder-neutral-500 text-white font-medium transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(input)}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}