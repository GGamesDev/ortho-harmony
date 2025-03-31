
import React, { useState } from 'react';
import { Appointment } from '@/utils/dummyData';
import { Clock, Calendar, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { useToast } from '@/hooks/use-toast';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteAppointment = (id: string) => {
    toast({
      title: "Appointment deleted",
      description: "The appointment has been deleted successfully.",
    });
  };

  return (
    <div className="ortho-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {appointments.length === 0 ? "No Appointments" : 
           appointments.length === 1 ? "1 Appointment" : 
           `${appointments.length} Appointments`}
        </h2>
        <Button onClick={() => setIsFormOpen(true)} size="sm">
          <Plus className="mr-1 h-4 w-4" /> New Appointment
        </Button>
      </div>
      
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-ortho-light rounded-full p-3">
                  <Calendar className="h-6 w-6 text-ortho-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{appointment.patientName}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {appointment.date} at {appointment.time} ({appointment.duration} min)
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5">
                      {appointment.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteAppointment(appointment.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No appointments found for the selected date.
          </div>
        )}
      </div>

      <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default AppointmentList;
