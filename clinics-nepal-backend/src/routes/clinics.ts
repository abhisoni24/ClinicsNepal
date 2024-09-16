import express, { Request, Response } from 'express';
import Clinic from '../models/Clinic';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating clinic', error });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinics', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinic', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error updating clinic', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting clinic', error });
  }
});

export default router;