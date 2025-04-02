import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { patients } from '@/utils/dummyData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Fix the type issue by converting string to number where needed
const AppointmentForm = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert string to number to fix type error
    setDuration(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime) {
      toast({
        title: 'Error',
        description: 'Please select a date and time.',
        variant: 'destructive',
      });
      return;
    }

    const appointmentTime = new Date(date);
    const [hours, minutes] = startTime.split(':').map(Number);
    appointmentTime.setHours(hours);
    appointmentTime.setMinutes(minutes);

    toast({
      title: 'Appointment Scheduled',
      description: `Appointment scheduled for ${format(appointmentTime, 'MMMM d, yyyy')} at ${format(appointmentTime, 'h:mm a')} with ${selectedPatient.firstName} ${selectedPatient.lastName} for ${duration} minutes.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patient">Patient</Label>
            <select
              id="patient"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedPatient.id}
              onChange={(e) => {
                const patient = patients.find((p) => p.id === e.target.value);
                if (patient) {
                  setSelectedPatient(patient);
                }
              }}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
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
                  {date ? format(date, 'MMMM dd, yyyy') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" value={startTime} onChange={handleTimeChange} />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                type="number"
                id="duration"
                value={duration}
                onChange={handleDurationChange}
                min="15"
                step="15"
              />
            </div>
          </div>
          
        </form>
      </CardContent>
      <CardFooter>
      <Button type="submit" onClick={handleSubmit}>Book Appointment</Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentForm;
