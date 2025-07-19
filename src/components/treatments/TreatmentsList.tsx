
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import TreatmentCard from './TreatmentCard';
import NewTreatmentDialog from './NewTreatmentDialog';
import { treatments } from '@/utils/treatmentData';

// Liste des traitements avec recherche et bouton pour ajouter un nouveau plan
const TreatmentsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTreatmentDialog, setShowNewTreatmentDialog] = useState(false);

  const filteredTreatments = treatments.filter(treatment =>
    treatment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input 
            placeholder="Rechercher un traitement..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filtrer
          </Button>
          <Button 
            className="flex-1 md:flex-none bg-ortho-primary hover:bg-ortho-primary/90"
            onClick={() => setShowNewTreatmentDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nouveau traitement
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="p-4 grid grid-cols-1 gap-4">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <TreatmentCard key={treatment.id} treatment={treatment} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun plan de traitement trouvé
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <NewTreatmentDialog 
        open={showNewTreatmentDialog} 
        onOpenChange={setShowNewTreatmentDialog}
      />
    </div>
  );
};

export default TreatmentsList;
