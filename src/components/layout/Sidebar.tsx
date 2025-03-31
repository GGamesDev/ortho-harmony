
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  ClipboardList, 
  BarChart2, 
  Settings,
  FileText
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, title, href, active = false }: SidebarItemProps) => {
  return (
    <Link 
      to={href} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-ortho-light text-ortho-primary' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium">{title}</span>
    </Link>
  );
};

interface SidebarProps {
  activePage: string;
}

const Sidebar = ({ activePage }: SidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-6 px-3">
      <div className="space-y-1">
        <SidebarItem 
          icon={<Home className="h-5 w-5" />} 
          title="Dashboard" 
          href="/" 
          active={activePage === 'dashboard'} 
        />
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          title="Patients" 
          href="/patients" 
          active={activePage === 'patients'} 
        />
        <SidebarItem 
          icon={<Calendar className="h-5 w-5" />} 
          title="Appointments" 
          href="/appointments" 
          active={activePage === 'appointments'} 
        />
        <SidebarItem 
          icon={<ClipboardList className="h-5 w-5" />} 
          title="Treatment Plans" 
          href="/treatments" 
          active={activePage === 'treatments'} 
        />
        <SidebarItem 
          icon={<FileText className="h-5 w-5" />} 
          title="Documents" 
          href="/documents" 
          active={activePage === 'documents'} 
        />
        <SidebarItem 
          icon={<BarChart2 className="h-5 w-5" />} 
          title="Reports" 
          href="/reports" 
          active={activePage === 'reports'} 
        />
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200 mt-6">
        <SidebarItem 
          icon={<Settings className="h-5 w-5" />} 
          title="Settings" 
          href="/settings" 
          active={activePage === 'settings'} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;
