import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES, ROUTE_CONFIG } from '../routes';
import SharedHeader from '../components/SharedHeader';

const itemTemplates = {
  laptop: {
    name: "Laptop",
    icon: "💻",
    specs: ["13\" Basic", "15\" Mid-Range", "17\" High-End"],
    conditions: ["Working", "Broken Screen", "Heat Stressed", "Non-Functional"],
  },
  phone: {
    name: "Smartphone",
    icon: "📱",
    specs: ["Budget Phone", "Mid-Range", "Flagship"],
    conditions: ["Working", "Screen Damage", "Water Damage", "Non-Functional"],
  },
  washingmachine: {
    name: "Washing Machine",
    icon: "🧺",
    specs: ["5-6 kg", "7-8 kg", "9+ kg"],
    conditions: ["Working", "Motor Issues", "Electrical Fault", "Non-Functional"],
  },
  refrigerator: {
    name: "Refrigerator",
    icon: "❄️",
    specs: ["Single Door", "Double Door", "Side-by-Side"],
    conditions: ["Working", "Cooling Issue", "Minor Fault", "Non-Functional"],
  },
  tv: {
    name: "Television",
    icon: "📺",
    specs: ["32\" LED/LCD", "43-50\" LED/LCD", "55\"+ LED/LCD"],
    conditions: ["Working", "Display Damage", "Power Issue", "Non-Functional"],
  },
  pcb: {
    name: "PCB/Motherboard",
    icon: "🔌",
    specs: ["Laptop PCB", "Desktop PCB", "Server PCB"],
    conditions: ["Heat Stressed", "Damaged", "Corroded", "Mixed Scrap"],
  }
};

const priceReference = {
  laptop: { base: 1500, range: [1000, 3000] },
  phone: { base: 800, range: [300, 2000] },
  washingmachine: { base: 2000, range: [1000, 5000] },
  refrigerator: { base: 3500, range: [2000, 6000] },
  tv: { base: 2500, range: [1500, 5000] },
  pcb: { base: 2000, range: [500, 5000] }
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SellForm() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemType: null,
    itemSpec: null,
    condition: null,
    quantity: 1,
    weight: "",
    description: "",
    price: "",
    location: "",
    photos: [],
    acceptTerms: false
  });

  const currentTemplate = formData.itemType ? itemTemplates[formData.itemType] : null;
  const suggestedPrice = currentTemplate ? priceReference[formData.itemType].base : 0;
  const priceRange = currentTemplate ? priceReference[formData.itemType].range : [0, 0];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5)
    }));
  };

  const removePhoto = (idx) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx)
    }));
  };

  const progressSteps = [
    { num: 1, label: "Item Type", icon: "📦" },
    { num: 2, label: "Details", icon: "📝" },
    { num: 3, label: "Photos", icon: "📸" },
    { num: 4, label: "Pricing", icon: "💰" },
    { num: 5, label: "Review", icon: "✓" }
  ];

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
                    onClick={() => navigate(route)}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      route === ROUTES.SELL
                        ? "text-emerald-300"
                        : "text-neutral-300 hover:text-neutral-100"
                    )}
                  >
                    <span>{config.label}</span>
                    {route === ROUTES.SELL && (
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
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-6 lg:p-8"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                List Your E-waste
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                Get instant quotes and connect with buyers across India
              </p>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {progressSteps.map((s, idx) => (
                <div key={s.num} className="flex items-center gap-2 sm:gap-4 flex-1">
                  <motion.button
                    onClick={() => s.num <= step && setStep(s.num)}
                    whileHover={{ scale: s.num <= step ? 1.1 : 1 }}
                    className={cn(
                      "relative w-10 h-10 sm:w-12 sm:h-12 rounded-full font-semibold flex items-center justify-center transition-all flex-shrink-0",
                      step >= s.num
                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg"
                        : "bg-white/10 border border-white/20 text-neutral-400"
                    )}
                  >
                    {step > s.num ? "✓" : s.num}
                  </motion.button>

                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold">{s.label}</div>
                    <div className="text-xs text-neutral-500">{s.icon}</div>
                  </div>

                  {idx < progressSteps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 rounded-full transition-all",
                      step > s.num
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        : "bg-white/10"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <StepItemType formData={formData} setFormData={setFormData} onNext={handleNext} />}
              {step === 2 && <StepDetails formData={formData} setFormData={setFormData} currentTemplate={currentTemplate} onNext={handleNext} onBack={handleBack} />}
              {step === 3 && <StepPhotos formData={formData} onUpload={handlePhotoUpload} onRemove={removePhoto} onNext={handleNext} onBack={handleBack} />}
              {step === 4 && <StepPricing formData={formData} setFormData={setFormData} suggestedPrice={suggestedPrice} priceRange={priceRange} onNext={handleNext} onBack={handleBack} />}
              {step === 5 && <StepReview formData={formData} setFormData={setFormData} currentTemplate={currentTemplate} onBack={handleBack} navigate={navigate} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function StepItemType({ formData, setFormData, onNext }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">What are you selling?</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(itemTemplates).map(([key, template]) => (
          <motion.button
            key={key}
            onClick={() => {
              setFormData(prev => ({ ...prev, itemType: key }));
              onNext();
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-2xl border-2 p-6 text-center transition-all group",
              formData.itemType === key
                ? "border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            )}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{template.icon}</div>
            <div className="font-bold text-lg">{template.name}</div>
            <div className="text-xs text-neutral-400 mt-2">{template.specs.length} specs</div>
          </motion.button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-neutral-300">
          Select the category that best matches your item.
        </p>
      </div>
    </div>
  );
}

function StepDetails({ formData, setFormData, currentTemplate, onNext, onBack }) {
  if (!currentTemplate) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Tell us more details</h3>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">Specification</label>
          <div className="space-y-2">
            {currentTemplate.specs.map((spec, idx) => (
              <motion.button
                key={idx}
                onClick={() => setFormData(prev => ({ ...prev, itemSpec: spec }))}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full text-left rounded-xl px-4 py-3 transition-all border",
                  formData.itemSpec === spec
                    ? "bg-emerald-500/30 border-emerald-400 text-emerald-200"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                {spec}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">Condition</label>
          <div className="space-y-2">
            {currentTemplate.conditions.map((cond, idx) => (
              <motion.button
                key={idx}
                onClick={() => setFormData(prev => ({ ...prev, condition: cond }))}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full text-left rounded-xl px-4 py-3 transition-all border",
                  formData.condition === cond
                    ? "bg-cyan-500/30 border-cyan-400 text-cyan-200"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                {cond}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-2">Quantity (units)</label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-2">Total Weight (kg)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            placeholder="e.g., 25.5"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Any additional details?"
          rows="4"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={!formData.itemSpec || !formData.condition}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold disabled:opacity-50"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function StepPhotos({ formData, onUpload, onRemove, onNext, onBack }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Add Photos (up to 5)</h3>
      <p className="text-neutral-400 text-sm">Clear photos help buyers trust your listing.</p>

      <motion.label
        whileHover={{ scale: 1.02 }}
        className="block relative rounded-2xl border-2 border-dashed border-emerald-400/50 bg-emerald-500/10 p-12 text-center cursor-pointer hover:bg-emerald-500/20 transition-all"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onUpload}
          disabled={formData.photos.length >= 5}
          className="hidden"
        />
        <div className="text-5xl mb-3">📸</div>
        <div className="font-semibold mb-1">Click to upload photos</div>
        <div className="text-xs text-neutral-400">
          {formData.photos.length}/5 photos uploaded
        </div>
      </motion.label>

      {formData.photos.length > 0 && (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {formData.photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-square"
            >
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <motion.button
                onClick={() => onRemove(idx)}
                whileHover={{ scale: 1.1 }}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold"
              >
                X
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function StepPricing({ formData, setFormData, suggestedPrice, priceRange, onNext, onBack }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Set Your Price</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className="text-xs text-neutral-400 mb-2">Minimum</div>
          <div className="text-2xl font-bold text-emerald-300">₹{priceRange[0].toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className="text-xs text-neutral-400 mb-2">Average</div>
          <div className="text-2xl font-bold text-emerald-300">₹{suggestedPrice.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className="text-xs text-neutral-400 mb-2">Maximum</div>
          <div className="text-2xl font-bold text-emerald-300">₹{priceRange[1].toLocaleString()}</div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-300 mb-3">Your Price</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">₹</span>
          <input
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder={`e.g., ${suggestedPrice}`}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 pl-10 text-lg text-white focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none font-semibold"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-300 mb-2">Pickup Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="e.g., Bengaluru, KA"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 outline-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={!formData.price || !formData.location}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold disabled:opacity-50"
        >
          Review
        </motion.button>
      </div>
    </div>
  );
}

function StepReview({ formData, setFormData, currentTemplate, onBack, navigate }) {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate(ROUTES.MARKETPLACE), 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-8 sm:p-12 text-center space-y-6"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl"
        >
          ✓
        </motion.div>
        <h2 className="text-3xl font-bold">Listing Created!</h2>
        <p className="text-neutral-300">Your item has been submitted for verification.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Review Your Listing</h3>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs text-neutral-400">Item</div>
            <div className="text-lg font-bold">{currentTemplate.name}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Specification</div>
            <div className="text-lg font-bold">{formData.itemSpec}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Condition</div>
            <div className="text-lg font-bold">{formData.condition}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Price</div>
            <div className="text-lg font-bold">₹{parseInt(formData.price).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
            className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
          />
          <span className="text-sm font-medium">I agree to EcoLoop terms</span>
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
        >
          Back
        </motion.button>
        <motion.button
          onClick={handleSubmit}
          disabled={!formData.acceptTerms}
          whileHover={{ scale: 1.02 }}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold disabled:opacity-50"
        >
          Publish
        </motion.button>
      </div>
    </div>
  );
}