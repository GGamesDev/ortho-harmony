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
import { Camera } from 'lucide-react';
import { patients } from '@/utils/dummyData';
import { radiographyTypes } from './PatientSelectionForm';

interface RadiographyCaptureProps {
  selectedPatient: string;
  radiographyType: string;
  isCapturing: boolean;
  onStartCapture: () => void;
  onCaptureComplete: () => void;
  onBack: () => void;
}

const RadiographyCapture: React.FC<RadiographyCaptureProps> = ({
  selectedPatient,
  radiographyType,
  isCapturing,
  onStartCapture,
  onCaptureComplete,
  onBack,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capture de radiographie</CardTitle>
        <CardDescription>
          Positionnez l’équipement et capturez l’image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-md aspect-video flex flex-col items-center justify-center">
          {isCapturing ? (
            <div className="text-center">
              <div className="animate-pulse mb-4">
                <Camera className="h-16 w-16 text-ortho-primary mx-auto" />
              </div>
              <p className="text-lg font-medium text-gray-700">Capture en cours...</p>
              <p className="text-sm text-gray-500">Veuillez patienter pendant la capture de l’image</p>
            </div>
          ) : (
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">Prêt à capturer</p>
              <p className="text-sm text-gray-500">Assurez-vous que le patient est bien positionné</p>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Patient :</dt>
              <dd className="text-sm text-gray-900">{patients.find(p => p.id === selectedPatient)?.name}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Type :</dt>
              <dd className="text-sm text-gray-900">
                {radiographyTypes.find(t => t.id === radiographyType)?.name}
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        {isCapturing ? (
          <Button 
            variant="default"
            onClick={onCaptureComplete}
          >
            Terminer
          </Button>
        ) : (
          <Button 
            className="bg-ortho-primary hover:bg-ortho-primary/90"
            onClick={onStartCapture}
          >
            <Camera className="mr-2 h-4 w-4" />
            Démarrer la capture
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RadiographyCapture;
