import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ROUTES } from '../routes';

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user: authUser } = useContext(AuthContext);

  console.log('useNavigation hook - authUser:', authUser);

  // Map current pathname to route
  const getCurrentPage = () => {
    const path = location.pathname;

    // Find the route that matches the current path
    for (const [key, value] of Object.entries(ROUTES)) {
      if (value === path) {
        return value;
      }
    }

    return ROUTES.LANDING;
  };

  const handleLogout = () => {
    console.log('🔴 handleLogout called');
    console.log('Before logout - localStorage:', localStorage.getItem('user'));

    logout();

    console.log('After logout - localStorage:', localStorage.getItem('user'));
    navigate(ROUTES.LANDING);
  };

  const returnObj = {
    currentPage: getCurrentPage(),
    user: authUser,
    navigate,
    handleLogout,
    handleLogin: (email, username) => {
      navigate(ROUTES.DASHBOARD);
    },
    handleSignup: (email, username, company) => {
      navigate(ROUTES.DASHBOARD);
    }
  };

  console.log('useNavigation returning:', returnObj);
  return returnObj;
}