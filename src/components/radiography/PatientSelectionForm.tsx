
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
import { patients } from '@/utils/dummyData';

export const radiographyTypes = [
  { id: 'panoramic', name: 'Panoramic' },
  { id: 'cephalometric', name: 'Cephalometric' },
  { id: 'periapical', name: 'Periapical' },
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
        <CardTitle>Patient Information</CardTitle>
        <CardDescription>
          Select patient and radiography details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patient">Patient</Label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger id="patient">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Patients</SelectLabel>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Radiography Type</Label>
          <Select value={radiographyType} onValueChange={setRadiographyType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
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
            placeholder="Add notes about this radiography..."
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
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientSelectionForm;
