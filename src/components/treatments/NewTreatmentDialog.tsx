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
import { useToast } from '@/hooks/use-toast';
import PatientSearch from '@/components/ui/patient-search';

interface NewTreatmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewTreatmentDialog = ({ open, onOpenChange }: NewTreatmentDialogProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [selectedPatient, setSelectedPatient] = React.useState<string>('');
  const [treatmentType, setTreatmentType] = React.useState<string>('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    if (!selectedPatient || !treatmentType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un patient et un type de traitement",
        variant: "destructive"
      });
      return;
    }
    
    // Dans une vraie application, ceci créerait un nouveau plan de traitement
    console.log('Données du nouveau plan de traitement :', { ...data, startDate, endDate, selectedPatient, treatmentType });
    
    const patient = require('@/utils/dummyData').patients.find((p: any) => p.id === selectedPatient);
    toast({
      title: "Plan de traitement créé",
      description: `Nouveau plan de traitement créé pour ${patient?.name}`,
    });
    
    reset();
    setSelectedPatient('');
    setTreatmentType('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Créer un nouveau plan de traitement</DialogTitle>
          <DialogDescription>
            Créez un nouveau plan de traitement pour un patient
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            <PatientSearch 
              value={selectedPatient}
              onChange={setSelectedPatient}
              placeholder="Rechercher un patient..."
              label="Patient"
              id="patient"
            />
            
            <div className="grid gap-2">
              <Label htmlFor="treatmentType">Type de traitement</Label>
              <Select value={treatmentType} onValueChange={setTreatmentType}>
                <SelectTrigger id="treatmentType">
                  <SelectValue placeholder="Sélectionner un type de traitement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="braces">Appareil dentaire</SelectItem>
                  <SelectItem value="invisalign">Invisalign</SelectItem>
                  <SelectItem value="retainer">Contention</SelectItem>
                  <SelectItem value="palatal_expander">Disjoncteur palatin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Date de début</Label>
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
                      {startDate ? format(startDate, "PPP") : "Sélectionner une date"}
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
                <Label htmlFor="endDate">Date de fin estimée</Label>
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
                      {endDate ? format(endDate, "PPP") : "Sélectionner une date"}
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
              <Label htmlFor="duration">Durée (mois)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                {...register("duration", { required: true })}
              />
              {errors.duration && <p className="text-sm text-red-500">Veuillez indiquer une durée</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Remarques</Label>
              <Textarea
                id="notes"
                placeholder="Ajouter des remarques supplémentaires..."
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
                setSelectedPatient('');
                setTreatmentType('');
                onOpenChange(false);
              }}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-ortho-primary hover:bg-ortho-primary/90">
              Créer le plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTreatmentDialog;
