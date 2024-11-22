import { Request, Response } from "express";
import { PatientSymptomUseCase } from "../../application/usecases/patient-symptom.usecase";
import { PatientSymptomRepositoryImpl } from "../../infrastructure/database/repositories/patient-symptom.repository.impl";

const patientSymptomRepository = new PatientSymptomRepositoryImpl();
const patientSymptomUseCase = new PatientSymptomUseCase(patientSymptomRepository);

export const assignSymptom = async (req: Request, res: Response) => {
    try {
        const { patientId, symptomId } = req.params;
        const relation = await patientSymptomUseCase.assignSymptomToPatient(patientId, symptomId);
        res.status(201).json(relation);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" }); 
    }
}

export const findSymptomsByPatientId = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;
        const symptoms = await patientSymptomUseCase.findSymptomsByPatientId(patientId);
        res.status(200).json(symptoms);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const removeSymptomFromPatient = async (req: Request, res: Response) => {
    try {
        const { patientId, symptomId } = req.params;
        await patientSymptomUseCase.removeSymptomFromPatient(patientId, symptomId);
        res.status(204).json({ message: 'Symptom removed from patient' });
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}