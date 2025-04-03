
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import StatsCards from '@/components/dashboard/StatsCards';
import AppointmentList from '@/components/dashboard/AppointmentList';
import TreatmentProgress from '@/components/dashboard/TreatmentProgress';
import PatientCard from '@/components/patients/PatientCard';
import { patients, appointments, stats } from '@/utils/dummyData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activePage="dashboard" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome to OrthoHarmony Dashboard</p>
            </header>
            
            <section className="mb-8">
              <StatsCards stats={stats} />
            </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <AppointmentList appointments={appointments} />
              </div>
              <div>
                <TreatmentProgress patients={patients} />
              </div>
            </section>
            
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Recent Patients</h2>
                <p className="text-gray-600 text-sm mt-1">Your most recently updated patient records</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {patients.slice(0, 4).map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
