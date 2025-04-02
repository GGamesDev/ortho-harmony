
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { patients } from '@/utils/dummyData';
import PatientCard from '@/components/patients/PatientCard';
import PatientsList from '@/components/patients/PatientsList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search as SearchIcon, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Patients = () => {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activePage="patients" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Patients</h1>
            <PatientsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Patients;
