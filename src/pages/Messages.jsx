import React, { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from '../hooks/useNavigation';
import { ROUTES } from '../routes';
import SharedHeader from '../components/SharedHeader';
import { AuthContext } from '../contexts/AuthContext';

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    name: "TechRecycle Pro",
    role: "seller",
    lastMessage: "The laptops are in excellent condition",
    time: "2m ago",
    unread: 2,
    online: true,
    avatar: "T"
  },
  {
    id: 2,
    name: "Green Electronics",
    role: "seller",
    lastMessage: "I can deliver by tomorrow",
    time: "1h ago",
    unread: 0,
    online: true,
    avatar: "G"
  },
  {
    id: 3,
    name: "EcoTech Buyers",
    role: "buyer",
    lastMessage: "What's your best price?",
    time: "3h ago",
    unread: 1,
    online: false,
    avatar: "E"
  },
  {
    id: 4,
    name: "RecycleHub Mumbai",
    role: "seller",
    lastMessage: "Thanks for your order!",
    time: "1d ago",
    unread: 0,
    online: false,
    avatar: "R"
  },
];

// Mock messages for selected conversation
const mockMessages = {
  1: [
    { id: 1, sender: "them", text: "Hi! I have 50 Dell laptops available", time: "10:30 AM", avatar: "T" },
    { id: 2, sender: "me", text: "Great! What's the condition?", time: "10:32 AM" },
    { id: 3, sender: "them", text: "The laptops are in excellent condition. All screens working, minor scratches only", time: "10:35 AM", avatar: "T" },
    { id: 4, sender: "me", text: "Can you send some photos?", time: "10:36 AM" },
    { id: 5, sender: "them", text: "Sure, I'll send them right away", time: "10:38 AM", avatar: "T" },
  ],
  2: [
    { id: 1, sender: "them", text: "Hello! Are you interested in server parts?", time: "Yesterday", avatar: "G" },
    { id: 2, sender: "me", text: "Yes, what do you have?", time: "Yesterday" },
    { id: 3, sender: "them", text: "I can deliver by tomorrow", time: "1h ago", avatar: "G" },
  ],
  3: [
    { id: 1, sender: "them", text: "What's your best price?", time: "3h ago", avatar: "E" },
    { id: 2, sender: "me", text: "I can offer ₹1,80,000 for the lot", time: "2h ago" },
  ],
};

export default function Messages() {
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle seller parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sellerParam = urlParams.get('seller');

    if (sellerParam) {
      try {
        const sellerInfo = JSON.parse(decodeURIComponent(sellerParam));

        // Check if conversation with this seller already exists
        let existingConv = conversations.find(conv =>
          conv.name === sellerInfo.sellerName
        );

        if (!existingConv) {
          // Create new conversation
          const newConv = {
            id: conversations.length + 1,
            name: sellerInfo.sellerName,
            role: "seller",
            lastMessage: `Interested in: ${sellerInfo.productTitle}`,
            time: "Just now",
            unread: 0,
            online: true,
            avatar: sellerInfo.sellerName.charAt(0).toUpperCase(),
            productInfo: {
              title: sellerInfo.productTitle,
              image: sellerInfo.productImage
            }
          };

          // Add to conversations
          setConversations([newConv, ...conversations]);
          existingConv = newConv;

          // Create initial message
          const initialMessage = {
            id: 1,
            sender: "me",
            text: `Hi! I'm interested in your listing: ${sellerInfo.productTitle}`,
            time: "Just now"
          };
          setMessages([initialMessage]);
        } else {
          // Select existing conversation
          setMessages(mockMessages[existingConv.id] || []);
        }

        setSelectedConv(existingConv);

        // Clean up URL
        window.history.replaceState({}, '', ROUTES.MESSAGES);
      } catch (error) {
        console.error('Error parsing seller info:', error);
      }
    }
  }, []);

  const handleSelectConversation = (conv) => {
    setSelectedConv(conv);
    setMessages(mockMessages[conv.id] || []);

    // Mark as read
    setConversations(conversations.map(c =>
      c.id === conv.id ? { ...c, unread: 0 } : c
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: "Just now"
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <SharedHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]"
        >
          {/* Conversations Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Messages
                </h2>
                {totalUnread > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-bold border border-emerald-400/40"
                  >
                    {totalUnread}
                  </motion.div>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-4 py-3 pl-11 text-white placeholder-neutral-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/40 outline-none transition-all text-sm"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredConversations.map((conv, idx) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSelectConversation(conv)}
                    className={cn(
                      "w-full p-4 flex items-start gap-3 border-b border-white/5 transition-all text-left",
                      selectedConv?.id === conv.id
                        ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                        : "hover:bg-white/5"
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border-2",
                        conv.role === "seller"
                          ? "bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border-emerald-400/40"
                          : "bg-gradient-to-br from-blue-400/30 to-purple-400/30 border-blue-400/40"
                      )}>
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-neutral-950" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                        <span className="text-xs text-neutral-400 flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-400 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center flex-shrink-0 ml-2">
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-neutral-900/60 to-neutral-950/60 backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border-2",
                        selectedConv.role === "seller"
                          ? "bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border-emerald-400/40"
                          : "bg-gradient-to-br from-blue-400/30 to-purple-400/30 border-blue-400/40"
                      )}>
                        {selectedConv.avatar}
                      </div>
                      {selectedConv.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-neutral-950" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedConv.name}</h3>
                      <p className="text-sm text-neutral-400">
                        {selectedConv.online ? "🟢 Online" : "⚫ Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                      📞
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                      ⋮
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={cn(
                          "flex items-end gap-2",
                          msg.sender === "me" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msg.sender === "them" && (
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
                            selectedConv.role === "seller"
                              ? "bg-gradient-to-br from-emerald-400/30 to-cyan-400/30"
                              : "bg-gradient-to-br from-blue-400/30 to-purple-400/30"
                          )}>
                            {msg.avatar}
                          </div>
                        )}

                        <div className={cn(
                          "max-w-md rounded-2xl px-4 py-3 backdrop-blur-xl",
                          msg.sender === "me"
                            ? "bg-gradient-to-br from-emerald-500/40 to-cyan-500/40 border border-emerald-400/40"
                            : "bg-white/10 border border-white/20"
                        )}>
                          <p className="text-sm text-white mb-1">{msg.text}</p>
                          <span className="text-xs text-neutral-400">{msg.time}</span>
                        </div>

                        {msg.sender === "me" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10">
                  <div className="flex items-end gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xl"
                    >
                      📎
                    </motion.button>

                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                        placeholder="Type your message..."
                        rows="1"
                        className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-4 py-3 text-white placeholder-neutral-400 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/40 outline-none transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!newMessage.trim()}
                      className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/30 text-xl"
                    >
                      🚀
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6 border-4 border-emerald-400/30">
                    <span className="text-6xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Select a Conversation</h3>
                  <p className="text-neutral-400">Choose a conversation from the sidebar to start messaging</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
