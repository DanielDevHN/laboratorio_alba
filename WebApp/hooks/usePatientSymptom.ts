import { useState } from 'react';
import {
    getPatientSymptoms,
    createPatientSymptom,
    deletePatientSymptom,
} from '@/services/patientSymptomService';

export const usePatientSymptom = () => {
    const [relations, setRelations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadPatientSymptoms = async (patientId: string) => {
        setLoading(true);
        try {
            const data = await getPatientSymptoms(patientId);
            setRelations(data);
        } catch (error) {
            console.error('Error loading patient symptoms:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addPatientSymptom = async (patientId: string, symptomId: string) => {
        try {
            await createPatientSymptom(patientId, symptomId);
            await loadPatientSymptoms(patientId); // Recargar después de agregar
        } catch (error) {
            console.error('Error adding patient symptom:', error);
            throw error;
        }
    };

    // const editPatientSymptom = async (patientId: string, symptomId: string, updates: any) => {
    //     try {
    //         await updatePatientSymptom(patientId, symptomId, updates);
    //         await loadPatientSymptoms(patientId); // Recargar después de editar
    //     } catch (error) {
    //         console.error('Error updating patient symptom:', error);
    //         throw error;
    //     }
    // };

    const removePatientSymptom = async (patientId: string, symptomId: string) => {
        try {
            await deletePatientSymptom(patientId, symptomId);
            await loadPatientSymptoms(patientId); // Recargar después de eliminar
        } catch (error) {
            console.error('Error deleting patient symptom:', error);
            throw error;
        }
    };

    return { relations, loading, loadPatientSymptoms, addPatientSymptom, removePatientSymptom };
};
