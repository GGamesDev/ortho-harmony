
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import TreatmentsList from '@/components/treatments/TreatmentsList';
import { useToast } from "@/hooks/use-toast";

const Treatments = () => {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="treatments" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Treatment Plans</h1>
              <TreatmentsList />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Treatments;
