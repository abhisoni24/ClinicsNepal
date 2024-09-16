import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAppointments } from '../redux/actions/appointmentActions';
import { Appointment } from '../types';

const AppointmentList: React.FC = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state: RootState) => state.appointments.appointments);

  useEffect(() => {
    dispatch(getAppointments() as any);
  }, [dispatch]);

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.map((appointment: Appointment) => (
        <div key={appointment.id}>
          <p>Clinic: {appointment.clinic.name}</p>
          <p>Doctor: {appointment.doctor.name}</p>
          <p>Date: {new Date(appointment.date).toLocaleString()}</p>
          <p>Status: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;