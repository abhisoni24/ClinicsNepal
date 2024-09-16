export interface User {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin';
  }
  
  export interface Clinic {
    id: string;
    name: string;
    address: string;
    phone: string;
    specialties: string[];
  }
  
  export interface Appointment {
    id: string;
    patient: User;
    clinic: Clinic;
    doctor: User;
    date: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
  }