import { Request, Response } from "express";
import { SymptomUseCase } from "../../application/usecases/symptom.usecase";
import { SymptomRepositoryImpl } from "../../infrastructure/database/repositories/symptom.repository.impl";

const symptomRepository = new SymptomRepositoryImpl();
const symptomUseCase = new SymptomUseCase(symptomRepository);

export const createSymptom = async (req: Request, res: Response) => {
    try {
        const symptom = await symptomUseCase.createSymptom(req.body);
        res.status(201).json(symptom);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const getSymptoms = async (req: Request, res: Response) => {
    try {
        const symptoms = await symptomUseCase.findAllSymptoms();
        res.status(200).json(symptoms);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const updateSymptom = async (req: Request, res: Response) => {
    try {
        const symptom = await symptomUseCase.updateSymptom(req.params.id, req.body);
        res.status(200).json(symptom);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}

export const deletedSymptom = async (req: Request, res: Response) => {
    try {
        await symptomUseCase.deleteSymptom(req.params.id);
        res.status(200).json({ message: 'Symptom deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
}