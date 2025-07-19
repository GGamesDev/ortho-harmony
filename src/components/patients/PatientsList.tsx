import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { patients } from '@/utils/dummyData';
import PatientCard from '@/components/patients/PatientCard';
import { useToast } from '@/hooks/use-toast';

const PatientsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.treatmentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterClick = () => {
    toast({
      title: "Filtrer les patients",
      description: "La fonctionnalité de filtre avancé sera bientôt disponible.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, email ou traitement..."
            className="pl-10"
            aria-label="Recherche des patients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none" onClick={handleFilterClick}>
            <Filter className="mr-2 h-4 w-4" /> Filtrer
          </Button>
          <Button 
            className="flex-1 md:flex-none bg-ortho-primary hover:bg-ortho-primary/90"
            // onClick={() => setShowNewTreatmentDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Ajouter un patient
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <ScrollArea className="h-[calc(100vh-16rem)]" aria-live="polite">
          <div className="p-4 grid grid-cols-1 gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun patient trouvé
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PatientsList;
