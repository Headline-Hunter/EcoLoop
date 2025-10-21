export const ROUTES = {
  LANDING: '/',
  MARKETPLACE: '/marketplace',
  SELL: '/sell',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ANALYTICS: '/analytics',
  ORDERS: '/orders',
  MESSAGES: '/messages',
  HELP: '/help',
  // Add new routes here as you create pages
};

export const ROUTE_CONFIG = {
  [ROUTES.LANDING]: {
    label: 'Home',
    requiresAuth: false,
    showInNav: true,
    path: '/'
  },
  [ROUTES.MARKETPLACE]: {
    label: 'Marketplace',
    requiresAuth: false,
    showInNav: true,
    path: '/marketplace'
  },
  [ROUTES.SELL]: {
    label: 'Sell',
    requiresAuth: true,
    showInNav: true,
    path: '/sell'
  },
  [ROUTES.DASHBOARD]: {
    label: 'Dashboard',
    requiresAuth: true,
    showInNav: true,
    path: '/dashboard'
  },
  [ROUTES.PROFILE]: {
    label: 'Profile',
    requiresAuth: true,
    showInNav: false,
    path: '/profile'
  },
  [ROUTES.ANALYTICS]: {
    label: 'Analytics',
    requiresAuth: true,
    showInNav: false,
    path: '/analytics'
  },
  [ROUTES.ORDERS]: {
    label: 'Orders',
    requiresAuth: true,
    showInNav: true,
    path: '/orders'
  },
  [ROUTES.MESSAGES]: {
    label: 'Messages',
    requiresAuth: true,
    showInNav: true,
    path: '/messages'
  },
  [ROUTES.HELP]: {
    label: 'Help',
    requiresAuth: false,
    showInNav: false,
    path: '/help'
  },
  // Add new route configs here
};