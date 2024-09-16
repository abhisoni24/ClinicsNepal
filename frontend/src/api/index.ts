import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const login = (email: string, password: string) => API.post('/auth/login', { email, password });
export const register = (name: string, email: string, password: string) => API.post('/auth/register', { name, email, password });

export const getClinics = () => API.get('/clinics');
export const getClinic = (id: string) => API.get(`/clinics/${id}`);

export const getAppointments = () => API.get('/appointments');
export const createAppointment = (appointmentData: any) => API.post('/appointments', appointmentData);
export const updateAppointment = (id: string, appointmentData: any) => API.put(`/appointments/${id}`, appointmentData);
