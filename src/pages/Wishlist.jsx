import React, { useState, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES } from '../routes';
import SharedHeader from '../components/SharedHeader';
import { WishlistContext } from '../contexts/WishlistContext';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// All available listings (in a real app, this would come from an API)
const allListings = [
  {
    id: 1,
    title: "Dell Latitude 5590 Motherboards",
    category: "PCB",
    seller: "TechRecycle Solutions",
    location: "Bengaluru, KA",
    quantity: "50 units",
    price: 72500,
    pricePerKg: 5800,
    image: "🔌",
    featured: true
  },
  {
    id: 2,
    title: "Working LCD Panels - 15.6\"",
    category: "Displays",
    seller: "ScreenSavers Inc",
    location: "Mumbai, MH",
    quantity: "200 units",
    price: 180000,
    pricePerKg: 2250,
    image: "🖥️",
    featured: true
  },
  {
    id: 3,
    title: "Premium Gold Contact Points",
    category: "Precious Metals",
    seller: "GoldTech Recovery",
    location: "Delhi, DL",
    quantity: "2.5 kg",
    price: 125000,
    pricePerKg: 50000,
    image: "💎",
    featured: false
  },
  {
    id: 4,
    title: "Server RAM DDR4 - Working",
    category: "Memory",
    seller: "DataCenter Surplus",
    location: "Hyderabad, TS",
    quantity: "500 sticks",
    price: 375000,
    pricePerKg: 25000,
    image: "🎮",
    featured: true
  },
  {
    id: 5,
    title: "Laptop Battery Cells - Li-ion",
    category: "Batteries",
    seller: "PowerCycle India",
    location: "Chennai, TN",
    quantity: "1000 cells",
    price: 45000,
    pricePerKg: 1500,
    image: "🔋",
    featured: false
  },
];

export default function Wishlist() {
  const { navigate } = useNavigation();
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  // Filter listings to only show wishlisted items
  const wishlistItems = useMemo(() => {
    return allListings.filter(listing => wishlist.has(listing.id));
  }, [wishlist]);

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-red-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-pink-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-rose-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent">
                My Wishlist ❤️
              </h1>
              <p className="text-lg text-neutral-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl p-6"
              >
                <div className="text-sm text-pink-200 mb-1">Total Value</div>
                <div className="text-3xl font-bold text-white">
                  ₹{totalValue.toLocaleString()}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-8xl mb-6"
            >
              💔
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">Your wishlist is empty</h3>
            <p className="text-neutral-400 mb-8">Start adding items you love to see them here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.MARKETPLACE)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Browse Marketplace
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm overflow-hidden transition-all hover:border-pink-400/40 hover:shadow-2xl hover:shadow-pink-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-rose-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:via-rose-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

                  {/* Remove Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.85 }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 transition-all"
                  >
                    <span className="text-lg">✕</span>
                  </motion.button>

                  <div className="relative p-6 space-y-4 cursor-pointer" onClick={() => navigate(`${ROUTES.MARKETPLACE}?item=${item.id}`)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="text-5xl"
                        >
                          {item.image}
                        </motion.div>
                      </div>

                      {item.featured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg mr-12"
                        >
                          Featured
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-neutral-100 mb-1 group-hover:text-pink-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-400">{item.category}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Quantity</div>
                        <div className="text-sm font-bold">{item.quantity}</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs text-neutral-400 mb-1">Location</div>
                        <div className="text-sm font-bold">{item.location}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <div className="text-xs text-neutral-400 mb-1">Total Price</div>
                          <div className="text-2xl font-bold text-pink-300">
                            ₹{item.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1">
                            ₹{item.pricePerKg.toLocaleString()}/kg
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`${ROUTES.MARKETPLACE}?item=${item.id}`);
                          }}
                          className="rounded-lg bg-pink-500/20 border border-pink-400/40 px-4 py-2 text-sm font-semibold text-pink-200 hover:bg-pink-500/30 transition-colors"
                        >
                          View
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Action Buttons */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(ROUTES.MARKETPLACE)}
              className="px-8 py-3 rounded-xl border-2 border-white/20 bg-white/5 font-semibold hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Continue Shopping
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Request Quote for All
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
