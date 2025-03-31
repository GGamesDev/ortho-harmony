
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { appointments } from '@/utils/dummyData';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter appointments for the selected date
  const filteredAppointments = selectedDate
    ? appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return (
          aptDate.getDate() === selectedDate.getDate() &&
          aptDate.getMonth() === selectedDate.getMonth() &&
          aptDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : appointments;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activePage="appointments" />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="ortho-card">
                  <h2 className="text-xl font-semibold mb-4">Calendar</h2>
                  <AppointmentCalendar 
                    selectedDate={selectedDate} 
                    onSelectDate={setSelectedDate} 
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <AppointmentList appointments={filteredAppointments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
