
import React from 'react';
import { Patient } from '@/utils/dummyData';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface TreatmentProgressProps {
  patients: Patient[];
}

const TreatmentProgress = ({ patients }: TreatmentProgressProps) => {
  return (
    <div className="ortho-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Treatment Progress</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="space-y-6">
        {patients.slice(0, 4).map((patient) => (
          <div key={patient.id} className="space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-gray-600">{patient.treatmentType}</p>
              </div>
              <span className="text-sm font-medium">{patient.treatmentProgress}%</span>
            </div>
            <Progress value={patient.treatmentProgress} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentProgress;
