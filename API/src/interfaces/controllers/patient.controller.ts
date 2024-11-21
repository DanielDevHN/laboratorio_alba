import { Request, Response } from "express";
import { PatientService } from "../../application/services/patient.service";

const patientService = new PatientService();

export const createPatient = async (req: Request, res: Response) => {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json(patient);
}

export const getPatients = async (req: Request, res: Response) => {
    const patients = await patientService.findAllPatients();
    res.status(200).json(patients);
}

export const getPatientById = async (req: Request, res: Response) => {
    const patient = await patientService.findPatientById(req.params.id);
    if(!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
}

export const updatePatient = async (req: Request, res: Response) => {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    if(!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
}

export const deletePatient = async (req: Request, res: Response) => {
    await patientService.deletePatient(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
}