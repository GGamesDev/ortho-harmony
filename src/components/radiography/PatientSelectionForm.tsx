import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import PatientSearch from '@/components/ui/patient-search';

export const radiographyTypes = [
  { id: 'panoramic', name: 'Panoramique' },
  { id: 'cephalometric', name: 'Céphalométrique' },
  { id: 'periapical', name: 'Périapicale' },
  { id: 'bitewing', name: 'Bitewing' },
  { id: 'cbct', name: 'CBCT (Cone Beam CT)' },
];

interface PatientSelectionFormProps {
  selectedPatient: string;
  setSelectedPatient: (patient: string) => void;
  radiographyType: string;
  setRadiographyType: (type: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onNextStep: () => void;
}

const PatientSelectionForm: React.FC<PatientSelectionFormProps> = ({
  selectedPatient,
  setSelectedPatient,
  radiographyType,
  setRadiographyType,
  notes,
  setNotes,
  onNextStep,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations sur le patient</CardTitle>
        <CardDescription>
          Sélectionnez le patient et les détails de la radiographie
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PatientSearch 
          value={selectedPatient}
          onChange={setSelectedPatient}
          placeholder="Rechercher un patient..."
          label="Patient"
          id="patient"
        />
        
        <div className="space-y-2">
          <Label htmlFor="type">Type de radiographie</Label>
          <Select value={radiographyType} onValueChange={setRadiographyType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                {radiographyTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Ajouter des notes concernant cette radiographie..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="ml-auto bg-ortho-primary hover:bg-ortho-primary/90"
          onClick={onNextStep}
          disabled={!selectedPatient || !radiographyType}
        >
          Étape suivante
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientSelectionForm;
