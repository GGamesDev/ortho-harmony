
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
        <CardTitle>Capture Radiography</CardTitle>
        <CardDescription>
          Position the equipment and capture the image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-md aspect-video flex flex-col items-center justify-center">
          {isCapturing ? (
            <div className="text-center">
              <div className="animate-pulse mb-4">
                <Camera className="h-16 w-16 text-ortho-primary mx-auto" />
              </div>
              <p className="text-lg font-medium text-gray-700">Capturing in progress...</p>
              <p className="text-sm text-gray-500">Please wait while the image is being captured</p>
            </div>
          ) : (
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">Ready to capture</p>
              <p className="text-sm text-gray-500">Make sure the patient is positioned correctly</p>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Patient:</dt>
              <dd className="text-sm text-gray-900">{patients.find(p => p.id === selectedPatient)?.name}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Type:</dt>
              <dd className="text-sm text-gray-900">
                {radiographyTypes.find(t => t.id === radiographyType)?.name}
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {isCapturing ? (
          <Button 
            variant="default"
            onClick={onCaptureComplete}
          >
            Complete
          </Button>
        ) : (
          <Button 
            className="bg-ortho-primary hover:bg-ortho-primary/90"
            onClick={onStartCapture}
          >
            <Camera className="mr-2 h-4 w-4" />
            Start Capture
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RadiographyCapture;
