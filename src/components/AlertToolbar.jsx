import React from 'react';
import { Hourglass } from 'lucide-react';
import { differenceInDays, addDays, parseISO } from 'date-fns';

const AlertToolbar = ({ entries }) => {
  const currentDate = new Date();

  const getAlerts = () => {
    return entries.flatMap(entry => {
      const cod = parseISO(entry.cod);
      const storageDate = addDays(cod, 25);
      const agingDate = addDays(cod, 35);
      
      const storageDaysLeft = differenceInDays(storageDate, currentDate);
      const agingDaysLeft = differenceInDays(agingDate, currentDate);
      
      const alerts = [];
      
      if (storageDaysLeft > 0 && storageDaysLeft <= 5) {
        alerts.push({
          type: 'storage',
          product: entry.product,
          quantity: entry.quantity,
          daysLeft: storageDaysLeft
        });
      }
      
      if (agingDaysLeft > 0 && agingDaysLeft <= 10) {
        alerts.push({
          type: 'aging',
          product: entry.product,
          quantity: entry.quantity,
          daysLeft: agingDaysLeft
        });
      }
      
      return alerts;
    });
  };

  const alerts = getAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-3 right-3 space-y-2">
      {alerts.map((alert, index) => (
        <div key={index} className="bg-yellow-50 border border-yellow-300 p-2 rounded-md">
          <div className="flex items-center">
            <Hourglass className="text-yellow-500 h-4 w-4 mr-1" />
            <div>
              <h4 className="text-yellow-800 font-medium text-xs">
                {alert.product} - {alert.type === 'storage' ? 'Storage Alert' : 'Aging Alert'}
              </h4>
              <p className="text-yellow-700 text-xs">
                {alert.quantity} m³ - {alert.type === 'storage' ? 'Storage' : 'Aging'} begins in {alert.daysLeft} day{alert.daysLeft > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertToolbar;
