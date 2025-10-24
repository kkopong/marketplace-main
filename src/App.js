import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import FeaturedApps from './components/FeaturedApps';
import AIToolsPage from './components/AIToolsPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import CategoriesPage from './components/CategoriesPage';
import OffersPage from './components/OffersPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { token } = JSON.parse(userData);
      if (token) {
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  // Check if current user is admin
  const isAdmin = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) return false;
    const { isAdmin } = JSON.parse(userData);
    return isAdmin;
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogin = (email) => {
    // In a real app, you would validate credentials and get a token
    const fakeToken = 'fake-jwt-token';
    const isAdminUser = email === 'admin@example.com'; // Simple admin check
    
    const userData = {
      token: fakeToken,
      isAdmin: isAdminUser,
      email: email
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', fakeToken); // Keep this for backward compatibility
    setIsAuthenticated(true);
    
    // Redirect based on user role
    return isAdminUser;
  };

  const handleSignup = (email) => {
    // In a real app, you would create a new user and log them in
    const fakeToken = 'fake-jwt-token';
    const isAdminUser = email === 'admin@example.com'; // Only this email gets admin access
    
    const userData = {
      token: fakeToken,
      isAdmin: isAdminUser,
      email: email
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', fakeToken); // Keep this for backward compatibility
    setIsAuthenticated(true);
    
    // Redirect based on user role
    return isAdminUser;
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center bg-dark-900">Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Public Route component
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center bg-dark-900">Loading...</div>;
    }
    return !isAuthenticated ? children : <Navigate to="/" />;
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-dark-900">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup onSignup={handleSignup} /> : <Navigate to="/" />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated && isAdmin() ? (
              <Dashboard />
            ) : isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/login" state={{ from: '/admin' }} />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark-900 relative overflow-hidden">
              <Sidebar 
                onPageChange={handlePageChange} 
                isCollapsed={isSidebarCollapsed} 
                onToggleCollapse={toggleSidebar}
                onLogout={handleLogout}
              />
              <div className={`transition-all duration-300 relative z-10 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} bg-dark-900 min-h-screen`}>
                <main className="p-12 max-w-[1400px] bg-dark-900">
                  {activePage === 'aitools' ? (
                    <AIToolsPage />
                  ) : activePage === 'subscriptions' ? (
                    <SubscriptionsPage />
                  ) : activePage === 'categories' ? (
                    <CategoriesPage />
                  ) : activePage === 'offers' ? (
                    <OffersPage />
                  ) : (
                    <>
                      <HeroBanner />
                      <FeaturedApps />
                    </>
                  )}
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />

        {/* Redirect all other routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setLoading(false);
    
    // If not authenticated and not on login/signup page, redirect to login
    if (!token && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? (
              <SignUpPage onSignup={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </>
  );
}

export default App;
>>>>>>> ff121ee6ccd10a48152449db3841b189dd675a45
