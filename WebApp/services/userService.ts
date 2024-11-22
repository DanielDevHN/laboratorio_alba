import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Loguear un usuario
export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${apiUrl}/login`, credentials);
  return response.data;
};

// Registrar un nuevo usuario
export const registerUser = async (user: { username: string; password: string }) => {
  const response = await axios.post(`${apiUrl}/users`, user);
  return response.data;
};

// Desactivar un usuario
export const deactivateUser = async (id: string) => {
  const response = await axios.patch(`${apiUrl}/users/${id}/deactivate`);
  return response.data;
};
