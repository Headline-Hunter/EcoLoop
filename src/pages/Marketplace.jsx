import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES, ROUTE_CONFIG } from '../routes';
import SharedHeader from '../components/SharedHeader';

const marketplaceListings = [
  {
    id: 1,
    title: "Dell Latitude 5590 Motherboards",
    category: "PCB",
    type: "scrap",
    seller: "TechRecycle Solutions",
    location: "Bengaluru, KA",
    quantity: "50 units",
    weight: "12.5 kg",
    price: 72500,
    pricePerKg: 5800,
    recovery: {
      gold: "12.5g",
      copper: "6kg",
      silver: "2.5g"
    },
    condition: "Heat stressed, non-functional",
    verified: true,
    image: "🔌",
    postedDate: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "Working LCD Panels - 15.6\"",
    category: "Displays",
    type: "refurb",
    seller: "ScreenSavers Inc",
    location: "Mumbai, MH",
    quantity: "200 units",
    weight: "80 kg",
    price: 180000,
    pricePerKg: 2250,
    condition: "Grade A, tested working",
    verified: true,
    image: "🖥️",
    postedDate: "1 day ago",
    featured: true
  },
  {
    id: 3,
    title: "Mixed Laptop Scrap Lot",
    category: "Mixed E-waste",
    type: "scrap",
    seller: "College Labs Disposal",
    location: "Pune, MH",
    quantity: "150 units",
    weight: "300 kg",
    price: 450000,
    pricePerKg: 1500,
    recovery: {
      gold: "37.5g",
      copper: "90kg",
      aluminum: "45kg"
    },
    condition: "Mixed brands, non-functional",
    verified: true,
    image: "💻",
    postedDate: "3 days ago",
    featured: false
  },
  {
    id: 4,
    title: "Server RAM DDR4 - Working",
    category: "Memory",
    type: "refurb",
    seller: "DataCenter Surplus",
    location: "Hyderabad, TS",
    quantity: "500 sticks",
    weight: "15 kg",
    price: 375000,
    pricePerKg: 25000,
    condition: "Tested, 16GB sticks",
    verified: true,
    image: "🎮",
    postedDate: "5 hours ago",
    featured: true
  },
  {
    id: 5,
    title: "Washing Machine Motors",
    category: "Motors",
    type: "scrap",
    seller: "Appliance Recyclers",
    location: "Chennai, TN",
    quantity: "100 units",
    weight: "450 kg",
    price: 225000,
    pricePerKg: 500,
    recovery: {
      copper: "135kg",
      steel: "200kg"
    },
    condition: "Decommissioned, copper windings intact",
    verified: true,
    image: "⚙️",
    postedDate: "1 week ago",
    featured: false
  },
  {
    id: 6,
    title: "CPU Processors - Intel i5/i7",
    category: "Processors",
    type: "refurb",
    seller: "ChipMasters",
    location: "Bengaluru, KA",
    quantity: "75 units",
    weight: "3 kg",
    price: 112500,
    pricePerKg: 37500,
    recovery: {
      gold: "2.25g",
      copper: "1.5kg"
    },
    condition: "Mixed generations, functional",
    verified: true,
    image: "🖥️",
    postedDate: "4 days ago",
    featured: false
  },
  {
    id: 7,
    title: "LED TV Scrap - 32\" to 55\"",
    category: "Displays",
    type: "scrap",
    seller: "Display Recycling Hub",
    location: "Delhi, DL",
    quantity: "80 units",
    weight: "600 kg",
    price: 240000,
    pricePerKg: 400,
    recovery: {
      aluminum: "180kg",
      copper: "48kg",
      glass: "300kg"
    },
    condition: "Display damaged, frames intact",
    verified: true,
    image: "📺",
    postedDate: "2 days ago",
    featured: false
  },
  {
    id: 8,
    title: "Hard Drives - 1TB SATA",
    category: "Storage",
    type: "refurb",
    seller: "Storage Solutions Pro",
    location: "Noida, UP",
    quantity: "300 units",
    weight: "180 kg",
    price: 450000,
    pricePerKg: 2500,
    condition: "Wiped & tested, warranty available",
    verified: true,
    image: "💾",
    postedDate: "6 hours ago",
    featured: true
  }
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Marketplace() {
  const { navigate } = useNavigation();
  const [selectedListing, setSelectedListing] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    type: "all",
    location: "all",
    verified: false
  });
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...new Set(marketplaceListings.map(l => l.category))];
  const locations = ["all", ...new Set(marketplaceListings.map(l => l.location.split(",")[1].trim()))];

  const filteredListings = useMemo(() => {
    let result = marketplaceListings.filter(listing => {
      const matchesCategory = filters.category === "all" || listing.category === filters.category;
      const matchesType = filters.type === "all" || listing.type === filters.type;
      const matchesLocation = filters.location === "all" || listing.location.includes(filters.location);
      const matchesVerified = !filters.verified || listing.verified;
      const matchesSearch = !searchQuery ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesType && matchesLocation && matchesVerified && matchesSearch;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "recent":
      default:
        result.sort((a, b) => {
          const priority = (l) => l.featured ? 0 : 1;
          return priority(a) - priority(b);
        });
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* HEADER */}
      <SharedHeader className="sticky top-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/80 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              onClick={() => navigate(ROUTES.LANDING)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
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
                      route === ROUTES.MARKETPLACE
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {route === ROUTES.MARKETPLACE && (
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6 lg:space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-6 lg:p-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-80 lg:h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Marketplace
                  </h2>
                  <p className="text-neutral-400 mt-2 text-sm sm:text-base">
                    {filteredListings.length} verified listings • Pan-India delivery
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm px-4 py-2.5 text-sm focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all hover:bg-neutral-900"
                  >
                    <option value="recent">Featured & Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search listings, sellers, or items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm px-6 py-3 sm:py-4 pl-12 text-sm focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all group-hover:border-white/20"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl"
          >
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl text-neutral-100 px-4 py-3 pr-10 text-sm font-medium focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all hover:bg-neutral-900/80 hover:border-white/20 cursor-pointer shadow-lg"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl text-neutral-100 px-4 py-3 pr-10 text-sm font-medium focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all hover:bg-neutral-900/80 hover:border-white/20 cursor-pointer shadow-lg"
                >
                  <option value="all">All Types</option>
                  <option value="scrap">Scrap Only</option>
                  <option value="refurb">Refurb/Working</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl text-neutral-100 px-4 py-3 pr-10 text-sm font-medium focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all hover:bg-neutral-900/80 hover:border-white/20 cursor-pointer shadow-lg"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Filters</label>
                <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/80 cursor-pointer hover:bg-neutral-900 transition-all group">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                    className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-sm group-hover:text-emerald-300 transition-colors">Verified Only</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-sm"
            >
              <div className="text-5xl sm:text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">No listings found</h3>
              <p className="text-neutral-400 text-sm">Try adjusting your filters or search query</p>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing, idx) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => setSelectedListing(listing)}
                  index={idx}
                />
              ))}
            </div>
          )}

          {/* Detail Modal */}
          <AnimatePresence>
            {selectedListing && (
              <ListingDetail
                listing={selectedListing}
                onClose={() => setSelectedListing(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function ListingCard({ listing, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm overflow-hidden cursor-pointer transition-all hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />

      <div className="relative p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl"
            >
              {listing.image}
            </motion.div>
            <div className="flex flex-col gap-1.5">
              <div className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-lg w-fit",
                listing.type === "scrap"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-400/40"
                  : "bg-blue-500/20 text-blue-300 border border-blue-400/40"
              )}>
                {listing.type === "scrap" ? "Scrap" : "Refurb"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {listing.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg"
              >
                Featured
              </motion.div>
            )}
            {listing.verified && (
              <div className="rounded-lg bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                ✓
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-100 mb-1 group-hover:text-emerald-300 transition-colors line-clamp-2">
            {listing.title}
          </h3>
          <p className="text-xs text-neutral-400">{listing.category}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
            <div className="text-xs text-neutral-400 mb-1">Quantity</div>
            <div className="text-sm font-bold">{listing.quantity}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
            <div className="text-xs text-neutral-400 mb-1">Weight</div>
            <div className="text-sm font-bold">{listing.weight}</div>
          </div>
        </div>

        {listing.recovery && (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
            <div className="text-xs text-emerald-200 font-semibold mb-2 flex items-center gap-1">
              Est. Recovery
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(listing.recovery).map(([key, value]) => (
                <span key={key} className="px-2 py-1 rounded-md bg-white/10 text-neutral-200 hover:bg-white/20 transition-colors">
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-white/10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-xs text-neutral-400 mb-1">Total Price</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300">
                ₹{listing.price.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                ₹{listing.pricePerKg.toLocaleString()}/kg
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-emerald-500/20 border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/30 transition-colors"
            >
              View
            </motion.button>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span className="truncate">{listing.location}</span>
          </div>
          <span className="whitespace-nowrap">{listing.postedDate}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ListingDetail({ listing, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 transition-colors"
        >
          ✕
        </button>

        <div className="relative p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-6xl sm:text-7xl"
            >
              {listing.image}
            </motion.div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                {listing.featured && (
                  <span className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1 text-xs font-semibold">
                    Featured
                  </span>
                )}
                {listing.verified && (
                  <span className="rounded-lg bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Verified Seller
                  </span>
                )}
                <span className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold",
                  listing.type === "scrap"
                    ? "bg-orange-500/20 text-orange-300 border border-orange-400/40"
                    : "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                )}>
                  {listing.type === "scrap" ? "Scrap Material" : "Refurbishable"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{listing.title}</h2>
              <p className="text-neutral-400">{listing.category}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
              <div>
                <div className="text-sm text-emerald-200 mb-2">Total Price</div>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-300">
                  ₹{listing.price.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-400 mt-2">
                  ₹{listing.pricePerKg.toLocaleString()} per kg
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border-2 border-emerald-400 bg-emerald-500/20 px-6 py-3 font-semibold text-emerald-200 hover:bg-emerald-500/30 transition-all"
                >
                  Message Seller
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className="text-sm text-neutral-400 mb-2">Quantity</div>
              <div className="text-xl sm:text-2xl font-bold">{listing.quantity}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className="text-sm text-neutral-400 mb-2">Weight</div>
              <div className="text-xl sm:text-2xl font-bold">{listing.weight}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className="text-sm text-neutral-400 mb-2">Location</div>
              <div className="text-xl sm:text-2xl font-bold">{listing.location}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className="text-sm text-neutral-400 mb-2">Posted</div>
              <div className="text-xl sm:text-2xl font-bold">{listing.postedDate}</div>
            </div>
          </div>

          {listing.recovery && (
            <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-6">
              <h3 className="text-lg font-bold mb-4 text-emerald-200 flex items-center gap-2">
                Estimated Material Recovery
              </h3>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                {Object.entries(listing.recovery).map(([material, amount]) => (
                  <motion.div
                    key={material}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl border border-white/10 bg-white/10 p-4 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="text-xs text-neutral-400 uppercase tracking-wide mb-1">{material}</div>
                    <div className="text-xl font-bold text-emerald-300">{amount}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-4">
                Recovery estimates based on standard industry extraction rates. Actual yields may vary.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              Condition & Details
            </h3>
            <p className="text-neutral-300 leading-relaxed">{listing.condition}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Seller Information
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border border-emerald-300/40 grid place-items-center text-2xl flex-shrink-0"
              >
                🏢
              </motion.div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{listing.seller}</div>
                <div className="text-sm text-neutral-400 mt-1">
                  {listing.verified ? "✓ KYB Verified • Trusted Seller" : "⏳ Pending Verification"}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                View Profile
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 py-3 font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>📋</span> Add to Watchlist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 py-3 font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>🔗</span> Share Listing
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}