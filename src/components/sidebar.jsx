import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  FileText,
  ClipboardList
} from 'lucide-react';
import Logo from '@/assets/images/logo.png';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-2 px-2 text-gray-700 hover:bg-[#BFE6FB] hover:text-[#EF4923]",
      active && "bg-[#BFE6FB] text-[#EF4923] font-semibold"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Button>
);

const Sidebar = ({ className, onNavigate, activePage }) => {
  return (
    <div className={cn("flex h-screen w-64 flex-col bg-white border-r border-gray-200", className)}>
      <div className="p-4 border-b border-gray-200">
        <img src={Logo} alt="Logo" className="h-16 w-auto mb-4" />
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <SidebarItem icon={Package} label="Inventory" active={activePage === 'inventory'} onClick={() => onNavigate('inventory')} />
        <SidebarItem icon={Users} label="Available Stock" active={activePage === 'availablestock'} onClick={() => onNavigate('availablestock')} />
        <SidebarItem icon={ClipboardList} label="New Order" active={activePage === 'newOrder'} onClick={() => onNavigate('newOrder')} />
        <SidebarItem icon={FileText} label="Entry" active={activePage === 'simpleEntry'} onClick={() => onNavigate('simpleEntry')} />
      </nav>
      <div className="p-4 border-t border-gray-200">
        <SidebarItem icon={Settings} label="Settings" onClick={() => onNavigate('settings')} />
        <SidebarItem icon={LogOut} label="Logout" onClick={() => onNavigate('logout')} />
      </div>
    </div>
  );
};

export default Sidebar;