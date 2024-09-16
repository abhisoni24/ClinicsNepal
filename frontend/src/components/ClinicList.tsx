import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getClinics } from '../redux/actions/clinicActions';
import { Clinic } from '../types';

const ClinicList: React.FC = () => {
  const dispatch = useDispatch();
  const clinics = useSelector((state: RootState) => state.clinics.clinics);

  useEffect(() => {
    dispatch(getClinics() as any);
  }, [dispatch]);

  return (
    <div>
      <h2>Clinics</h2>
      {clinics.map((clinic: Clinic) => (
        <div key={clinic.id}>
          <h3>{clinic.name}</h3>
          <p>{clinic.address}</p>
          <p>{clinic.phone}</p>
          <p>Specialties: {clinic.specialties.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default ClinicList;
