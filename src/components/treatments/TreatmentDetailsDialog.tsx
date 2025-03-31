
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, FileText } from 'lucide-react';
import { Treatment } from '@/utils/treatmentData';

interface TreatmentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatment: Treatment;
}

const TreatmentDetailsDialog = ({ 
  open, 
  onOpenChange, 
  treatment 
}: TreatmentDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Treatment Plan Details</DialogTitle>
          <DialogDescription>
            View the complete treatment plan for {treatment.patientName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-2">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{treatment.patientName}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-1" />
                <span>{treatment.type}</span>
              </div>
            </div>
            
            <div className="text-sm px-3 py-1 bg-ortho-light text-ortho-primary rounded-full">
              {treatment.status}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Treatment Progress</span>
              <span className="text-sm font-medium text-ortho-primary">{treatment.progress}%</span>
            </div>
            <Progress value={treatment.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <div className="text-sm">
                <p className="text-gray-500">Start Date</p>
                <p className="font-medium">{treatment.startDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <div className="text-sm">
                <p className="text-gray-500">Estimated End Date</p>
                <p className="font-medium">{treatment.estimatedEndDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <div className="text-sm">
                <p className="text-gray-500">Duration</p>
                <p className="font-medium">{treatment.duration} months</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <div className="text-sm">
                <p className="text-gray-500">Next Appointment</p>
                <p className="font-medium">{treatment.nextAppointment}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Treatment Milestones</h4>
            <div className="space-y-3">
              {treatment.milestones?.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <CheckCircle className={`h-4 w-4 ${milestone.completed ? 'text-green-500' : 'text-gray-300'}`} />
                  </div>
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{treatment.notes}</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="default" className="bg-ortho-primary hover:bg-ortho-primary/90">
            Edit Treatment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TreatmentDetailsDialog;
