import { useState } from 'react';
import type { Page } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
// import Dashboard from './components/pages/Dashboard';
import Dashboard from './components/pages/Dashboard/index';
import Farms from './components/pages/Farms/Farms';
import Resources from './components/pages/Resources/Resources';
// import Marketplace from './components/pages/Marketplace/Marketplace';
import Marketplace from './components/pages/Marketplace/index';
import Orders from './components/pages/Orders/Orders';
import AuthPages from './components/pages/Auth/Auth'; 

const EcofyApp = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  const [isAuthenticated, setIsAuthenticated] = useState(false); //  authentication state
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   setCurrentPage('dashboard'); // Reset to dashboard
  // };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard selectedCrop={selectedCrop} setSelectedCrop={setSelectedCrop} />;
      case 'farms':
        return <Farms />;
      case 'resources':
        return <Resources />;
      case 'marketplace':
        return <Marketplace />;
      case 'orders':
        return <Orders />;
      default:
        return <Dashboard selectedCrop={selectedCrop} setSelectedCrop={setSelectedCrop} />;
    }
  };

  // Show authentication pages if not authenticated
  if (!isAuthenticated) {
    return <AuthPages onAuthSuccess={handleAuthSuccess} />;
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        //onLogout={handleLogout} // Pass logout handler to sidebar
      />
      <div className="ml-64">
        <Header />
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default EcofyApp;