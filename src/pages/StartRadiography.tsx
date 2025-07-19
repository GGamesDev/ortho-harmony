import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
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
    // Dans une vraie application, cela activerait la caméra/les capteurs
  };
  
  const handleCaptureComplete = () => {
    // Dans une vraie application, cela enregistrerait la radiographie
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
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="radiographies" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={handleBack} className="mr-4">
                  Retour
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentStep === 1 ? 'Démarrer une nouvelle radiographie' : 'Capturer la radiographie'}
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
      </SidebarProvider>
    </div>
  );
};

export default StartRadiography;
