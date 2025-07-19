import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import { appointments } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { useToast } from '@/hooks/use-toast';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const currentWeekStart = selectedDate ? startOfWeek(selectedDate) : startOfWeek(new Date());
  const currentWeekEnd = selectedDate ? endOfWeek(selectedDate) : endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

  const handlePrevious = () => {
    if (selectedDate) {
      setSelectedDate(viewMode === 'day' ? addDays(selectedDate, -1) : addDays(selectedDate, -7));
    }
  };

  const handleNext = () => {
    if (selectedDate) {
      setSelectedDate(viewMode === 'day' ? addDays(selectedDate, 1) : addDays(selectedDate, 7));
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleDeleteAppointment = (id: string) => {
    toast({
      title: "Rendez-vous supprimé",
      description: "Le rendez-vous a été supprimé avec succès.",
    });
  };

  const getFilteredAppointments = () => {
    if (!selectedDate) return [];

    if (viewMode === 'day') {
      return appointments.filter(apt => {
        const aptDate = parseISO(apt.date);
        return isSameDay(aptDate, selectedDate);
      }).sort((a, b) => a.time.localeCompare(b.time));
    } else {
      return appointments.filter(apt => {
        const aptDate = parseISO(apt.date);
        return weekDays.some(day => isSameDay(day, aptDate));
      });
    }
  };

  const filteredAppointments = getFilteredAppointments();
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);

  const appointmentsByTime = timeSlots.map(hour => {
    const hourString = `${hour === 12 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    const aptsInHour = filteredAppointments.filter(apt => {
      const [hourPart] = apt.time.split(':');
      const aptHour = parseInt(hourPart, 10) + (apt.time.includes('PM') && parseInt(hourPart, 10) !== 12 ? 12 : 0) - (apt.time.includes('AM') && parseInt(hourPart, 10) === 12 ? 12 : 0);
      return aptHour === hour;
    });

    return {
      hour: hourString,
      appointments: aptsInHour,
    };
  });

  const appointmentsByDay = weekDays.map(day => {
    const aptsInDay = appointments.filter(apt => {
      const aptDate = parseISO(apt.date);
      return isSameDay(aptDate, day);
    }).sort((a, b) => a.time.localeCompare(b.time));

    return {
      day,
      appointments: aptsInDay,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="appointments" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Rendez-vous</h1>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-80">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={viewMode === 'day' ? 'bg-ortho-light text-ortho-primary' : ''}
                      onClick={() => setViewMode('day')}
                    >
                      Jour
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={viewMode === 'week' ? 'bg-ortho-light text-ortho-primary' : ''}
                      onClick={() => setViewMode('week')}
                    >
                      Semaine
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <Button size="icon" variant="ghost" onClick={handlePrevious}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleToday}>Aujourd'hui</Button>
                    <Button size="icon" variant="ghost" onClick={handleNext}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <Button className="flex-1 md:flex-none bg-ortho-primary hover:bg-ortho-primary/90" onClick={() => setIsFormOpen(true)}>
                      <Plus className="mr-1 h-4 w-4" /> Nouveau rendez-vous
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full overflow-hidden top-3">
                <div className="md:col-span-4 overflow-hidden flex flex-col h-full">
                  <Card className="flex-1 overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>
                        {viewMode === 'day' ? 'Planning journalier' : 'Planning hebdomadaire'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 overflow-hidden">
                      <ScrollArea className="h-[calc(100vh-240px)]">
                        {viewMode === 'day' ? (
                          <div className="space-y-4">
                            {appointmentsByTime.map((timeSlot) => (
                              <div key={timeSlot.hour} className="border-t pt-2 pb-2">
                                <div className="text-sm font-medium text-gray-500 mb-2">{timeSlot.hour}</div>
                                <div className="pl-4">
                                  {timeSlot.appointments.length > 0 ? (
                                    <div className="space-y-2">
                                      {timeSlot.appointments.map(appointment => (
                                        <div 
                                          key={appointment.id} 
                                          className="flex items-center justify-between p-3 rounded-lg border border-l-4 border-l-ortho-primary bg-white hover:bg-gray-50 transition-colors"
                                        >
                                          <div className="flex items-start space-x-3">
                                            <div className="bg-ortho-light rounded-full p-2">
                                              <Clock className="h-5 w-5 text-ortho-primary" />
                                            </div>
                                            <div>
                                              <h3 className="font-medium">{appointment.patientName}</h3>
                                              <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="h-3.5 w-3.5 mr-1" />
                                                <span>{appointment.time} ({appointment.duration} min)</span>
                                              </div>
                                              <div className="mt-1">
                                                <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5">
                                                  {appointment.type}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon">
                                              <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              className="text-destructive"
                                              onClick={() => handleDeleteAppointment(appointment.id)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-400 italic py-1">Aucun rendez-vous prévu</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-7 gap-4">
                            {appointmentsByDay.map((dayData, index) => (
                              <div key={index} className="min-w-[140px]">
                                <div 
                                  className={`text-center p-2 mb-2 rounded-md ${
                                    isSameDay(dayData.day, new Date()) ? 'bg-ortho-light text-ortho-primary font-medium' : ''
                                  }`}
                                >
                                  <div className="font-medium">{format(dayData.day, 'EEE', { locale: undefined /* option locale fr possible */ })}</div>
                                  <div className="text-2xl font-bold">{format(dayData.day, 'd')}</div>
                                </div>
                                <div className="space-y-2">
                                  {dayData.appointments.map(appointment => (
                                    <div 
                                      key={appointment.id} 
                                      className="p-2 text-xs border-l-2 border-ortho-primary bg-white rounded border shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                      <div className="font-medium">{appointment.time}</div>
                                      <div className="font-medium truncate">{appointment.patientName}</div>
                                      <div className="text-gray-500 truncate">{appointment.type}</div>
                                    </div>
                                  ))}
                                  {dayData.appointments.length === 0 && (
                                    <div className="text-xs text-center text-gray-400 py-4">Aucun rendez-vous</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
      <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Appointments;
