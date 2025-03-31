
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patients } from '@/utils/dummyData';
import { useToast } from '@/hooks/use-toast';

interface NewTreatmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewTreatmentDialog = ({ open, onOpenChange }: NewTreatmentDialogProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    // In a real app, this would create a new treatment plan
    console.log('New treatment plan data:', { ...data, startDate, endDate });
    
    toast({
      title: "Treatment plan created",
      description: `New treatment plan created for ${data.patientName}`,
    });
    
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Treatment Plan</DialogTitle>
          <DialogDescription>
            Create a new treatment plan for a patient
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <Select>
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.patient && <p className="text-sm text-red-500">Please select a patient</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="treatmentType">Treatment Type</Label>
              <Select>
                <SelectTrigger id="treatmentType">
                  <SelectValue placeholder="Select treatment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="braces">Braces</SelectItem>
                  <SelectItem value="invisalign">Invisalign</SelectItem>
                  <SelectItem value="retainer">Retainer</SelectItem>
                  <SelectItem value="palatal_expander">Palatal Expander</SelectItem>
                </SelectContent>
              </Select>
              {errors.treatmentType && <p className="text-sm text-red-500">Please select a treatment type</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate">Estimated End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                {...register("duration", { required: true })}
              />
              {errors.duration && <p className="text-sm text-red-500">Please enter a duration</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                {...register("notes")}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-ortho-primary hover:bg-ortho-primary/90">
              Create Treatment Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTreatmentDialog;
