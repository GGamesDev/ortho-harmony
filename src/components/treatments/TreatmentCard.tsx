
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight,
  FileText,
  Edit,
  Trash
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TreatmentDetailsDialog from './TreatmentDetailsDialog';
import { Treatment } from '@/utils/treatmentData';

interface TreatmentCardProps {
  treatment: Treatment;
}

// Affichage synthétique d’un traitement dans une carte
const TreatmentCard = ({ treatment }: TreatmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-gray-900">{treatment.patientName}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="h-4 w-4 mr-1" />
              <span>{treatment.type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {treatment.startDate}
            </span>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <span className="text-sm font-medium">
              {treatment.estimatedEndDate}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progression</span>
            <span className="text-sm font-medium text-ortho-primary">{treatment.progress}%</span>
          </div>
          <Progress value={treatment.progress} className="h-2" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Prochain RDV : {treatment.nextAppointment}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">Durée : {treatment.duration} mois</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" /> Modifier
          </Button>
          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
            <Trash className="h-4 w-4 mr-1" /> Supprimer
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-ortho-primary"
          onClick={() => setShowDetails(true)}
        >
          Voir détails <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>

      <TreatmentDetailsDialog 
        open={showDetails} 
        onOpenChange={setShowDetails}
        treatment={treatment} 
      />
    </Card>
  );
};

export default TreatmentCard;
