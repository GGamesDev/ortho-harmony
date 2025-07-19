import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import PatientsList from '@/components/patients/PatientsList';
import { useToast } from "@/hooks/use-toast";

const Patients = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="patients" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Patients</h1>
              <PatientsList />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Patients;
