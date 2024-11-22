import { Request, Response } from "express";
import { PatientUseCase } from "../../application/usecases/patient.usecase";
import { PatientRepositoryImpl } from "../../infrastructure/database/repositories/patient.repository.impl";

const patientRepository = new PatientRepositoryImpl();
const patientUseCase = new PatientUseCase(patientRepository);

export const createPatient = async (req: Request, res: Response) => {
    try {
        const patient = await patientUseCase.createPatient(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await patientUseCase.findAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const getPatientById = async (req: Request, res: Response) => {
    try {
        const patient = await patientUseCase.findPatientById(req.params.id);
        if(!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const patient = await patientUseCase.updatePatient(req.params.id, req.body);
        if(!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const deletePatient = async (req: Request, res: Response) => {
    try {
        await patientUseCase.deletePatient(req.params.id);
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}