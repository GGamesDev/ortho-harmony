
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo?: string;
  email: string;
  phone: string;
  treatmentProgress: number;
  nextAppointment: string;
  treatmentType: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes: string;
}

export interface StatsData {
  newPatients: number;
  appointments: number;
  treatments: number;
  revenue: number;
}

// Dummy patients
export const patients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 14,
    gender: "Female",
    email: "sjohnson@example.com",
    phone: "(555) 123-4567",
    treatmentProgress: 65,
    nextAppointment: "2023-06-15T09:30",
    treatmentType: "Braces"
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 12,
    gender: "Male",
    email: "mchen@example.com",
    phone: "(555) 234-5678",
    treatmentProgress: 30,
    nextAppointment: "2023-06-16T14:00",
    treatmentType: "Invisalign"
  },
  {
    id: "P003",
    name: "Emma Wilson",
    age: 16,
    gender: "Female",
    email: "ewilson@example.com",
    phone: "(555) 345-6789",
    treatmentProgress: 85,
    nextAppointment: "2023-06-17T11:15",
    treatmentType: "Braces"
  },
  {
    id: "P004",
    name: "Jason Rodriguez",
    age: 15,
    gender: "Male",
    email: "jrodriguez@example.com",
    phone: "(555) 456-7890",
    treatmentProgress: 10,
    nextAppointment: "2023-06-15T16:30",
    treatmentType: "Invisalign"
  },
  {
    id: "P005",
    name: "Olivia Smith",
    age: 13,
    gender: "Female",
    email: "osmith@example.com",
    phone: "(555) 567-8901",
    treatmentProgress: 50,
    nextAppointment: "2023-06-18T10:00",
    treatmentType: "Braces"
  }
];

// Dummy appointments
export const appointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Sarah Johnson",
    date: "2023-06-15",
    time: "09:30 AM",
    duration: 30,
    type: "Adjustment",
    notes: "Monthly braces adjustment"
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Michael Chen",
    date: "2023-06-16",
    time: "02:00 PM",
    duration: 45,
    type: "Check-up",
    notes: "Invisalign progress check"
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Emma Wilson",
    date: "2023-06-17",
    time: "11:15 AM",
    duration: 30,
    type: "Adjustment",
    notes: "Final adjustment before removal"
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Jason Rodriguez",
    date: "2023-06-15",
    time: "04:30 PM",
    duration: 60,
    type: "Initial fitting",
    notes: "First Invisalign tray fitting"
  },
  {
    id: "A005",
    patientId: "P005",
    patientName: "Olivia Smith",
    date: "2023-06-18",
    time: "10:00 AM",
    duration: 30,
    type: "Adjustment",
    notes: "Mid-treatment progress check"
  },
  {
    id: "A006",
    patientId: "P001",
    patientName: "Sarah Johnson",
    date: "2023-07-15",
    time: "09:30 AM",
    duration: 30,
    type: "Adjustment",
    notes: "Follow-up adjustment"
  }
];

// Dummy statistics
export const stats: StatsData = {
  newPatients: 12,
  appointments: 28,
  treatments: 45,
  revenue: 18500
};
