
import React from 'react';
import { Users, Calendar, Activity, DollarSign } from 'lucide-react';
import { StatsData } from '@/utils/dummyData';

interface StatsCardsProps {
  stats: StatsData;
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color: string; 
}) => {
  return (
    <div className="ortho-card flex items-center">
      <div className={`h-12 w-12 rounded-full ${color} flex items-center justify-center mr-4 shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        title="New Patients" 
        value={stats.newPatients} 
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-blue-500"
      />
      <StatsCard 
        title="Appointments" 
        value={stats.appointments} 
        icon={<Calendar className="h-6 w-6 text-white" />}
        color="bg-green-500"
      />
      <StatsCard 
        title="Active Treatments" 
        value={stats.treatments} 
        icon={<Activity className="h-6 w-6 text-white" />}
        color="bg-purple-500"
      />
      <StatsCard 
        title="Monthly Revenue" 
        value={`$${stats.revenue.toLocaleString()}`} 
        icon={<DollarSign className="h-6 w-6 text-white" />}
        color="bg-yellow-500"
      />
    </div>
  );
};

export default StatsCards;
