import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import SimpleEntryForm from './components/EntryForm';
import OrderForm from './components/NewOrder';
import StockEntryForm from './components/StockEntryForm';
import AvailableStock from './components/AvailableStock';
import Dashboard from './components/Dashboard';
import { Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'inventory':
        return <StockEntryForm />;
      case 'availablestock':
        return <AvailableStock />;
      case 'simpleEntry':
        return <SimpleEntryForm />;
      case 'newOrder':
        return <OrderForm />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <h2 className="text-2xl font-semibold">Welcome to {activePage}</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onNavigate={handleNavigate} activePage={activePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
