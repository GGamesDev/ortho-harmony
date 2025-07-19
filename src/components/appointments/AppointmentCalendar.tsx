import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { patients, appointments } from '@/utils/dummyData';
import { format } from 'date-fns';

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dayAppointments = appointments.filter(appointment => {
    return format(new Date(appointment.date), 'yyyy-MM-dd') === format(date || new Date(), 'yyyy-MM-dd');
  });

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {date ? (
        <p className="mt-4">
          {format(date, 'PPP', { locale: undefined /* Remplace par fr si tu importes locale */ })}
        </p>
      ) : (
        <p className="mt-4">
          Veuillez sélectionner une date.
        </p>
      )}

      {dayAppointments.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Rendez-vous pour le {format(date || new Date(), 'PPP', { locale: undefined })} :</h3>
          <ul>
            {dayAppointments.map(appointment => (
              <li key={appointment.id} className="py-2">
                {appointment.patientName} - {appointment.time}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4">
          <p>Pas de rendez-vous pour cette journée.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
