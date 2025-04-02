
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
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
import { Camera, ArrowRight } from 'lucide-react';
import { patients } from '@/utils/dummyData';

const radiographyTypes = [
  { id: 'panoramic', name: 'Panoramic' },
  { id: 'cephalometric', name: 'Cephalometric' },
  { id: 'periapical', name: 'Periapical' },
  { id: 'bitewing', name: 'Bitewing' },
  { id: 'cbct', name: 'CBCT (Cone Beam CT)' },
];

const StartRadiography = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [radiographyType, setRadiographyType] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  
  const handleStartCapture = () => {
    setIsCapturing(true);
    // In a real app, this would activate camera/sensors
  };
  
  const handleCaptureComplete = () => {
    // In a real app, this would save the radiography
    navigate('/radiographies');
  };
  
  const handleNextStep = () => {
    setCurrentStep(2);
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/radiographies');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activePage="radiographies" />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentStep === 1 ? 'Start New Radiography' : 'Capture Radiography'}
              </h1>
            </div>
            
            {currentStep === 1 ? (
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
                    onClick={handleNextStep}
                    disabled={!selectedPatient || !radiographyType}
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
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
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  {isCapturing ? (
                    <Button 
                      variant="default"
                      onClick={handleCaptureComplete}
                    >
                      Complete
                    </Button>
                  ) : (
                    <Button 
                      className="bg-ortho-primary hover:bg-ortho-primary/90"
                      onClick={handleStartCapture}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Start Capture
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartRadiography;
