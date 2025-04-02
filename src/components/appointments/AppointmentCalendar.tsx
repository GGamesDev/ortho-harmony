import React, { useState } from 'react';
import { Calendar, DateView } from '@/components/ui/calendar';
import { patients, appointments } from '@/utils/dummyData';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Fix the day_appointment error by removing it
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
          {format(date, 'PPP')}
        </p>
      ) : (
        <p className="mt-4">
          Please select a date.
        </p>
      )}

      {dayAppointments.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Appointments for {format(date || new Date(), 'PPP')}:</h3>
          <ul>
            {dayAppointments.map(appointment => (
              <li key={appointment.id} className="py-2">
                {appointment.title} - {appointment.time}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4">
          <p>No appointments for this day.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
