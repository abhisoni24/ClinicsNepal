import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ClinicList from './ClinicList';
import AppointmentBooking from './AppointmentBooking';
import AppointmentList from './AppointmentList';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <ClinicList />
      <AppointmentBooking />
      <AppointmentList />
    </div>
  );
};

export default Dashboard;