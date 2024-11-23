import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPatientSymptoms = async (patientId: string) => {
    try {
        const response = await axios.get(`${apiUrl}/patients/${patientId}/symptoms`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching patient symptoms:', error);
        throw error;
    }
};
export const createPatientSymptom = async (patientId: string, symptomId: string) => {
    const response = await axios.post(`${apiUrl}/patients/${patientId}/symptoms/${symptomId}`);
    return response.data;
};

// export const updatePatientSymptom = async (patientId: string, symptomId: string, updates: any) => {
//     const response = await axios.patch(`${apiUrl}/patients/${patientId}/symptoms/${symptomId}`, updates);
//     return response.data;
// };

export const deletePatientSymptom = async (patientId: string, symptomId: string) => {
    const response = await axios.delete(`${apiUrl}/patients/${patientId}/symptoms/${symptomId}`);
    return response.data;
};
