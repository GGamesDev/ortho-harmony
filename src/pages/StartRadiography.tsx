
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import PatientSelectionForm from '@/components/radiography/PatientSelectionForm';
import RadiographyCapture from '@/components/radiography/RadiographyCapture';

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
              <PatientSelectionForm
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                radiographyType={radiographyType}
                setRadiographyType={setRadiographyType}
                notes={notes}
                setNotes={setNotes}
                onNextStep={handleNextStep}
              />
            ) : (
              <RadiographyCapture
                selectedPatient={selectedPatient}
                radiographyType={radiographyType}
                isCapturing={isCapturing}
                onStartCapture={handleStartCapture}
                onCaptureComplete={handleCaptureComplete}
                onBack={handleBack}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartRadiography;
