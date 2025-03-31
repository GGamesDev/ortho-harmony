
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { patients } from '@/utils/dummyData';
import PatientCard from '@/components/patients/PatientCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search as SearchIcon, Filter } from 'lucide-react';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.treatmentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage="patients" />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
                <p className="text-gray-600">Manage your patient records</p>
              </div>
              
              <Button className="bg-ortho-primary hover:bg-ortho-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </div>
            
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients by name, email or treatment..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No patients found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
