import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { createAppointment } from '../redux/actions/appointmentActions';
import { Clinic, User } from '../types';

const AppointmentBooking: React.FC = () => {
  const dispatch = useDispatch();
  const clinics = useSelector((state: RootState) => state.clinics.clinics);
  const user = useSelector((state: RootState) => state.auth.user);

  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(createAppointment({
        patient: user.id,
        clinic: selectedClinic,
        doctor: selectedDoctor,
        date: new Date(appointmentDate),
      }) as any);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
      <select value={selectedClinic} onChange={(e) => setSelectedClinic(e.target.value)} required>
        <option value="">Select a Clinic</option>
        {clinics.map((clinic: Clinic) => (
          <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        ))}
      </select>
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
        <option value="">Select a Doctor</option>
        {/* Populate with doctors from the selected clinic */}
      </select>
      <input
        type="datetime-local"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        required
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentBooking;