import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ROUTES } from '../routes';

export default function AuthModal({ redirectTo = ROUTES.LANDING, onClose }) {
  const [authStep, setAuthStep] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '', company: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      alert('Please fill in all fields and select your role');
      return;
    }

    setLoading(true);
    const username = formData.username || formData.email.split('@')[0];
    login(formData.email, username, formData.role);
    setFormData({ email: '', password: '', username: '', company: '', role: '' });

    setTimeout(() => {
      setLoading(false);
      onClose();
      navigate(redirectTo);
    }, 500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.company || !formData.role) {
      alert('Please fill in all fields and select your role');
      return;
    }

    setLoading(true);
    const username = formData.username || formData.company;
    signup(formData.email, username, formData.company, formData.role);
    setFormData({ email: '', password: '', username: '', company: '', role: '' });

    setTimeout(() => {
      setLoading(false);
      onClose();
      navigate(redirectTo);
    }, 500);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-emerald-950/30 to-neutral-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

      <div className="relative backdrop-blur-xl p-8 sm:p-16">
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 transition-all border border-white/10 hover:border-white/30 z-50"
        >
          <span className="text-2xl text-white">✕</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Branding & Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex flex-col justify-between space-y-12"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                  EcoLoop
                </h2>
                <p className="text-neutral-300 text-base leading-relaxed">
                  Join the verified B2B e-waste trading platform connecting buyers and sellers across India.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: '✓', text: 'Verified sellers & secure transactions' },
                  { icon: '📦', text: 'Instant quotes on e-waste lots' },
                  { icon: '🚚', text: '24h pickup in metros' },
                  { icon: '💰', text: 'Best market rates guaranteed' },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400/60 flex items-center justify-center text-emerald-300 text-lg font-bold flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-neutral-300 text-sm">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-6 backdrop-blur-sm">
              <p className="text-sm text-emerald-200 leading-relaxed">
                Trusted by 500+ companies in recycling and refurbishment across India
              </p>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.h1
                key={authStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {authStep === 'login' ? 'Welcome Back' : 'Join Today'}
              </motion.h1>
              <motion.p
                key={`desc-${authStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-neutral-300 text-base leading-relaxed"
              >
                {authStep === 'login'
                  ? 'Sign in to access your dashboard and manage listings'
                  : 'Create an account to start trading e-waste'}
              </motion.p>
            </div>

            {/* Form */}
            <form
              onSubmit={authStep === 'login' ? handleLoginSubmit : handleSignupSubmit}
              className="space-y-5"
            >
              {/* Role Selection - Show for both login and signup */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'buyer', label: 'Buyer', icon: '🛒', desc: authStep === 'login' ? 'Login as buyer' : 'I want to purchase e-waste' },
                    { value: 'seller', label: 'Seller', icon: '💼', desc: authStep === 'login' ? 'Login as seller' : 'I want to sell e-waste' },
                  ].map((role) => (
                    <motion.button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: role.value })}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                        formData.role === role.value
                          ? 'border-emerald-400 bg-emerald-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{role.icon}</span>
                          <span className="font-semibold text-white">{role.label}</span>
                        </div>
                        <p className="text-xs text-neutral-400">{role.desc}</p>
                      </div>
                      {formData.role === role.value && (
                        <motion.div
                          layoutId="roleSelected"
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <span className="text-sm">✓</span>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {authStep === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-300 mb-3">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-white placeholder-neutral-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/40 outline-none transition-all text-base"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Don’t be shy, type your email here 😚"
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-white placeholder-neutral-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/40 outline-none transition-all text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 pr-12 text-white placeholder-neutral-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/40 outline-none transition-all text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors text-lg"
                  >
                    {showPassword ? '👁' : '👁'}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 font-semibold text-white text-base shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Processing...
                  </>
                ) : authStep === 'login' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </form>

            {/* Toggle Auth Step */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAuthStep(authStep === 'login' ? 'signup' : 'login');
                setFormData({ email: '', password: '', username: '', company: '', role: '' });
              }}
              className="w-full rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3.5 font-semibold text-white text-base hover:bg-white/10 hover:border-white/40 transition-all"
            >
              {authStep === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </motion.button>

            {/* Terms */}
            <p className="text-xs text-neutral-500 text-center leading-relaxed">
              By continuing, you agree to EcoLoop's{' '}
              <span className="text-emerald-400 hover:underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-emerald-400 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}