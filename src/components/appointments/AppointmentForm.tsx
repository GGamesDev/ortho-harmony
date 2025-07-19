import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { patients } from '@/utils/dummyData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isBefore, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PatientSearch from '@/components/ui/patient-search';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentForm = ({ isOpen, onClose }: AppointmentFormProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState('');

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 15) {
      setDuration(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !selectedPatient || !appointmentType) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    const selectedPatientData = patients.find(p => p.id === selectedPatient);
    if (!selectedPatientData) {
      toast({
        title: 'Erreur',
        description: 'Patient non trouvé.',
        variant: 'destructive',
      });
      return;
    }

    const appointmentTime = new Date(date);
    const [hours, minutes] = startTime.split(':').map(Number);
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      toast({
        title: 'Erreur',
        description: 'Heure invalide.',
        variant: 'destructive',
      });
      return;
    }

    appointmentTime.setHours(hours);
    appointmentTime.setMinutes(minutes);

    toast({
      title: 'Rendez-vous planifié',
      description: `Rendez-vous prévu le ${format(appointmentTime, 'dd MMMM yyyy')} à ${format(appointmentTime, 'HH:mm')} avec ${selectedPatientData.name} pour ${duration} minutes.`,
    });

    // Reset form and close
    setDate(new Date());
    setStartTime('');
    setSelectedPatient('');
    setAppointmentType('');
    setDuration(30);
    onClose();
  };

  // Fonction pour désactiver les dates passées (au jour près)
  const isDateDisabled = (day: Date) => {
    return isBefore(startOfDay(day), startOfDay(new Date()));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Planifier un nouveau rendez-vous</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <PatientSearch
              value={selectedPatient}
              onChange={setSelectedPatient}
              placeholder="Rechercher un patient par nom, email ou téléphone..."
              label="Patient *"
              id="patient-search"
            />

            <div>
              <Label htmlFor="appointment-type">Type de rendez-vous *</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type de rendez-vous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="adjustment">Ajustement</SelectItem>
                  <SelectItem value="emergency">Urgence</SelectItem>
                  <SelectItem value="checkup">Contrôle régulier</SelectItem>
                  <SelectItem value="treatment">Session de traitement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd MMMM yyyy') : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time">Heure</Label>
                <Input type="time" id="time" value={startTime} onChange={handleTimeChange} />
              </div>
              <div>
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={handleDurationChange}
                  min={15}
                  step={15}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Réserver</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm;
