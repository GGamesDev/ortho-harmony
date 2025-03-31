
import React from 'react';
import { Patient } from '@/utils/dummyData';
import { Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <div className="ortho-card flex flex-col h-full">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-ortho-primary rounded-full flex items-center justify-center text-white font-medium">
          {patient.name.split(' ').map(part => part[0]).join('')}
        </div>
        <div>
          <h3 className="font-medium">{patient.name}</h3>
          <p className="text-sm text-gray-600">
            {patient.age} years • {patient.gender}
          </p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Treatment Progress</span>
          <span className="text-sm">{patient.treatmentProgress}%</span>
        </div>
        <Progress value={patient.treatmentProgress} className="h-2" />
        <p className="text-xs text-gray-600 mt-2">{patient.treatmentType}</p>
      </div>
      
      <div className="mt-auto pt-4">
        <Button size="sm" variant="outline" className="w-full">View Record</Button>
      </div>
    </div>
  );
};

export default PatientCard;
