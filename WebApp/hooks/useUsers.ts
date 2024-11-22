import { useState } from "react";
import { loginUser, registerUser, deactivateUser } from "../services/userService";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", `Bearer ${data.token}`);
      return data;
    } catch (err) {
      setError("Invalid login credentials");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(user);
    } catch (err) {
      setError("Error registering user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateUserById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deactivateUser(id);
    } catch (err) {
      setError("Error deactivating user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, deactivateUserById, loading, error };
};
