import { useState, useEffect } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient } from '../services/patientService';

export const usePatient = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        setLoading(true);
        try {
            const data = await getPatients();
            setPatients(data);
        } catch (error) {
            console.error('Error loading patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const addPatient = async (patient: any) => {
        try {
            await createPatient(patient);
            loadPatients();
        } catch (error) {
            console.error('Error creating patient:', error);
            throw error; // Lanzar el error para manejarlo en la página
        }
    };

    const editPatient = async (id: string, patient: any) => {
        try {
            await updatePatient(id, patient);
            loadPatients();
        } catch (error) {
            console.error('Error updating patient:', error);
            throw error; // Lanzar el error para manejarlo en la página
        }
    };

    const removePatient = async (id: string) => {
        try {
            await deletePatient(id);
            loadPatients();
        } catch (error) {
            console.error('Error deleting patient:', error);
            throw error; // Lanzar el error para manejarlo en la página
        }
    };

    return { patients, loading, addPatient, editPatient, removePatient };
};
