import { useState, useEffect } from 'react';
import { getSymptoms, createSymptom, updateSymptom, deleteSymptom } from '../services/symptomService';

export const useSymptom = () => {
    const [symptoms, setSymptoms] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadSymptoms();
    }, []);

    const loadSymptoms = async () => {
        setLoading(true);
        try {
            const data = await getSymptoms();
            setSymptoms(data);
        } catch (error) {
            console.error('Error loading symptoms:', error);
        } finally {
            setLoading(false);
        }
    };

    const addSymptom = async (symptom: any) => {
        try {
            await createSymptom(symptom);
            loadSymptoms();
        } catch (error) {
            console.error('Error creating symptom:', error);
            throw error;
        }
    };

    const editSymptom = async (id: string, symptom: any) => {
        try {
            await updateSymptom(id, symptom);
            loadSymptoms();
        } catch (error) {
            console.error('Error updating symptom:', error);
            throw error;
        }
    };

    const removeSymptom = async (id: string) => {
        try {
            await deleteSymptom(id);
            loadSymptoms();
        } catch (error) {
            console.error('Error deleting symptom:', error);
            throw error;
        }
    };

    return { symptoms, loading, loadSymptoms, addSymptom, editSymptom, removeSymptom };
};
