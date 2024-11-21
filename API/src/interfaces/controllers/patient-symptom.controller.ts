import { Request, Response } from "express";
import { PatientSymptomService } from "../../application/services/patient-symptom.service";

const patientSymptomService = new PatientSymptomService();

export const assignSymptom = async (req: Request, res: Response) => {
    const { patientId, symptomId } = req.params;
    const relation = await patientSymptomService.assingSymptomToPatient(patientId, symptomId);
    res.status(201).json(relation);
}

export const getSymptomsForPatient = async (req: Request, res: Response) => {
    const { patientId } = req.params;
    const symptoms = await patientSymptomService.getSymptomsForPatient(patientId);
    res.status(200).json(symptoms);
}

export const removeSymptom = async (req: Request, res: Response) => {
    const { patientId, symptomId } = req.params;
    await patientSymptomService.removeSymptomFromPatient(patientId, symptomId);
    res.status(204).json({ message: 'Symptom removed from patient' });
}