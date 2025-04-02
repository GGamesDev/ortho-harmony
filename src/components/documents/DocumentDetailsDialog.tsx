
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Document } from '@/utils/documentData';
import { patients } from '@/utils/dummyData';
import { Mail, Download, Printer, X } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface DocumentDetailsDialogProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignPatient: (documentId: string, patientId: string, patientName: string) => void;
}

const DocumentDetailsDialog = ({ 
  document, 
  isOpen, 
  onClose, 
  onAssignPatient 
}: DocumentDetailsDialogProps) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(document?.assignedPatientId || '');
  
  if (!document) return null;
  
  const handleAssignPatient = () => {
    if (!selectedPatientId) {
      toast({
        title: "Error",
        description: "Please select a patient",
        variant: "destructive"
      });
      return;
    }
    
    const patient = patients.find(p => p.id === selectedPatientId);
    if (patient) {
      onAssignPatient(document.id, patient.id, patient.name);
      toast({
        title: "Success",
        description: `Document assigned to ${patient.name}`,
      });
    }
  };
  
  const handleEmailDocument = () => {
    if (!document.assignedPatientId) {
      toast({
        title: "Error",
        description: "Please assign a patient first",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Email sent",
      description: `Document "${document.title}" has been emailed to the patient`,
    });
  };
  
  const handleDownloadDocument = () => {
    toast({
      title: "Download started",
      description: `Document "${document.title}" is being downloaded`,
    });
  };
  
  const handlePrintDocument = () => {
    toast({
      title: "Print job sent",
      description: `Document "${document.title}" has been sent to the printer`,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{document.title}</DialogTitle>
            <Badge className="ml-2">{document.category}</Badge>
          </div>
          <DialogDescription>
            {document.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="text-sm text-gray-500">
            <p>Created: {format(new Date(document.createdAt), 'MMMM d, yyyy')}</p>
            <p>Last updated: {format(new Date(document.updatedAt), 'MMMM d, yyyy')}</p>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patient" className="text-right">
              Assign Patient
            </Label>
            <div className="col-span-3">
              <Select 
                value={selectedPatientId} 
                onValueChange={setSelectedPatientId}
              >
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAssignPatient} 
            className="w-full"
          >
            {document.assignedPatientId ? 'Reassign Patient' : 'Assign Patient'}
          </Button>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium mb-2">Document Actions</h4>
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleEmailDocument}
                disabled={!document.assignedPatientId}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleDownloadDocument}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handlePrintDocument}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailsDialog;
