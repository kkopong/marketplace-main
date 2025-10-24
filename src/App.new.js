import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import FeaturedApps from './components/FeaturedApps';
import AIToolsPage from './components/AIToolsPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import CategoriesPage from './components/CategoriesPage';
import OffersPage from './components/OffersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function Dashboard() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [location]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      <Sidebar 
        onPageChange={handlePageChange} 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
        onLogout={handleLogout}
      />

      <div className={`transition-all duration-300 relative z-10 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <main className="p-12 max-w-[1400px]">
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

      <button className="fixed bottom-8 right-8 w-16 h-16 bg-dark-900 hover:bg-dark-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50 border-2 border-dark-700">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />} />
      <Route path="/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" state={{ from: location }} replace />} />
    </Routes>
  );
}

export default App;
