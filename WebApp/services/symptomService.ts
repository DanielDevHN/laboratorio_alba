import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getSymptoms = async () => {
    try {
        const response = await axios.get(`${apiUrl}/symptoms`);
        return response.data;
    } catch (error) {
        console.error('Error loading symptoms:', error);
        throw error;
    }
};

export const createSymptom = async (symptom: any) => {
    try {
        const response = await axios.post(`${apiUrl}/symptoms`, symptom);
        return response.data;
    } catch (error) {
        console.error('Error creating symptom:', error);
        throw error;
    }
};

export const updateSymptom = async (id: string, symptom: any) => {
    try {
        const response = await axios.patch(`${apiUrl}/symptoms/${id}`, symptom);
        return response.data;
    } catch (error) {
        console.error('Error updating symptom:', error);
        throw error;
    }
};

export const deleteSymptom = async (id: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/symptoms/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting symptom:', error);
        throw error;
    }
};
