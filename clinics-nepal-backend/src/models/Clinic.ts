import mongoose, { Document, Schema } from 'mongoose';

interface IClinic extends Document {
  name: string;
  address: string;
  phone: string;
  specialties: string[];
}

const clinicSchema = new Schema<IClinic>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  specialties: [{ type: String }]
});

export default mongoose.model<IClinic>('Clinic', clinicSchema);