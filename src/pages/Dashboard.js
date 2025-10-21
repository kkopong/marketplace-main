import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import HeroBanner from '../components/HeroBanner';
import FeaturedApps from '../components/FeaturedApps';
import AIToolsPage from '../components/AIToolsPage';
import SubscriptionsPage from '../components/SubscriptionsPage';
import CategoriesPage from '../components/CategoriesPage';
import OffersPage from '../components/OffersPage';

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        onPageChange={handlePageChange} 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 relative z-10 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Main Content Area */}
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

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
        onClick={() => console.log('Add new item')}
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

export default Dashboard;
