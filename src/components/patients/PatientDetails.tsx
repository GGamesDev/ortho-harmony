
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Patient } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Phone, Mail, Clock, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PatientDetailsProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

const PatientDetails = ({ patient, isOpen, onClose }: PatientDetailsProps) => {
  const { toast } = useToast();
  
  const handleEditPatient = () => {
    toast({
      title: "Edit Patient",
      description: `Opening edit form for ${patient.name}`,
    });
    // In a real app, this would open an edit form or navigate to edit page
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Patient Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 bg-ortho-primary rounded-full flex items-center justify-center text-white text-2xl font-medium mb-4">
                {patient.name.split(' ').map(part => part[0]).join('')}
              </div>
              <h2 className="text-xl font-medium">{patient.name}</h2>
              <p className="text-gray-600">
                {patient.age} years • {patient.gender}
              </p>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 space-y-6">
            <div className="ortho-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium flex items-center">
                  <Clipboard className="h-5 w-5 mr-2 text-ortho-primary" />
                  Treatment Information
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Treatment Progress</span>
                    <span className="font-medium">{patient.treatmentProgress}%</span>
                  </div>
                  <Progress value={patient.treatmentProgress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Treatment Type</p>
                    <p className="font-medium">{patient.treatmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Appointment</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-ortho-primary" />
                      {new Date(patient.nextAppointment).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ortho-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-ortho-primary" />
                  Recent Appointments
                </h3>
              </div>
              <p className="text-gray-600">
                No recent appointments available.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleEditPatient}>Edit Patient</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetails;
