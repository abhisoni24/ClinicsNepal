import mongoose, { Document, Schema } from 'mongoose';

interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  clinic: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const appointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clinic: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
});

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);