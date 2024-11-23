"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { registerUser } from "@/services/userService";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Registrar usuario en la API
      await registerUser({ username, password });
      setSuccess(true);
      setError("");

      // Redirigir al login después de un registro exitoso
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-200">
      <Card
        title="Register"
        subTitle="Create an account to access the system"
        className="p-4 w-10 sm:w-6 lg:w-3 shadow-5 border-round"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block text-900 font-medium mb-2">
            Username
          </label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">
            Confirm Password
          </label>
          <Password
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleMask
            feedback={false}
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Registration successful! Redirecting...</p>
        )}
        <Button
          label="Register"
          className="w-full mb-3 p-button-rounded"
          onClick={handleRegister}
        />
        <p className="text-center text-gray-500">Already have an account?</p>
        <Button
          label="Back to Login"
          className="p-button-text w-full text-blue-500"
          onClick={handleLoginRedirect}
        />
      </Card>
    </div>
  );
};

export default RegisterPage;
