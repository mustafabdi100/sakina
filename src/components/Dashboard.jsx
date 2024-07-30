import React, { useEffect, useState } from 'react';
import { Droplet, Package } from 'lucide-react';
import AlertToolbar from './AlertToolbar';
import sampleData from '../../sampleData.json';  // Make sure this path is correct

const Dashboard = () => {
  const [data, setData] = useState({ stocks: {}, entries: [] });

  useEffect(() => {
    // Fetch data from the sample JSON file
    setData(sampleData);
  }, []);

  const colorClasses = {
    PMS: "bg-blue-100 border-blue-300",
    AGO: "bg-green-100 border-green-300",
    IK: "bg-yellow-100 border-yellow-300",
  };

  const renderCard = (title, Icon, quantity, lastUpdated, additionalInfo, colorClass) => (
    <div className={`border p-4 rounded-md ${colorClass} shadow-sm`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-2" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-medium">{quantity} m³</p>
          <p className="text-xs">{additionalInfo}</p>
          <p className="text-xs text-gray-500">Last Updated: {lastUpdated}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Object.entries(data.stocks).map(([product, stock]) => (
          renderCard(`Stock - ${product}`, Droplet, stock.quantity, stock.lastUpdated, "+20% from last month", colorClasses[product])
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {data.entries.map((entry) => (
          renderCard(`Entry - ${entry.product}`, Package, entry.quantity, entry.lastUpdated, "+5% from last month", colorClasses[entry.product])
        ))}
      </div>
      
      <AlertToolbar entries={data.entries} />
    </div>
  );
};

export default Dashboard;
