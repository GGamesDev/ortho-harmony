
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { appointments } from '@/utils/dummyData';

interface AppointmentCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const AppointmentCalendar = ({ selectedDate, onSelectDate }: AppointmentCalendarProps) => {
  // Create a map of dates with appointments
  const appointmentDates = appointments.reduce<Record<string, number>>((acc, appointment) => {
    const dateStr = appointment.date;
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  // Function to render appointment indicators
  const getDayClassNames = (day: Date) => {
    const dateStr = day.toISOString().split('T')[0];
    return appointmentDates[dateStr] ? 'bg-ortho-light text-ortho-primary font-medium' : undefined;
  };

  return (
    <div className="appointment-calendar">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className="rounded-md"
        modifiersClasses={{
          selected: 'bg-ortho-primary text-white',
          today: 'bg-ortho-light text-ortho-primary'
        }}
        modifiers={{
          appointment: (date) => {
            const dateStr = date.toISOString().split('T')[0];
            return !!appointmentDates[dateStr];
          }
        }}
        modifiersStyles={{
          appointment: { fontWeight: 'bold', backgroundColor: 'var(--ortho-light)', color: 'var(--ortho-primary)' }
        }}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Select a date to view appointments</p>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
