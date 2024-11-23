import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPatients = async () => {
    try {
        const response = await axios.get(`${apiUrl}/patients`);
        return response.data;
    } catch (error) {
        console.error('Error loading patients:', error);
        throw error;
    }
};

export const createPatient = async (patient: any) => {
    try {
        const response = await axios.post(`${apiUrl}/patients`, patient);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

export const updatePatient = async (id: string, patient: any) => {
    try {
        const { id: _, ...payload } = patient;
        const response = await axios.patch(`${apiUrl}/patients/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

export const deletePatient = async (id: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/patients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};
