
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TreatmentsList from '@/components/treatments/TreatmentsList';
import { useToast } from "@/hooks/use-toast";

const Treatments = () => {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activePage="treatments" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Treatment Plans</h1>
            <TreatmentsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Treatments;
