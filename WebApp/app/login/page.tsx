"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { loginUser } from "@/services/userService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      const token = response.token;

      // Guardar el token en localStorage
      localStorage.setItem("token", `Bearer ${token}`);

      // Redirigir al dashboard o página principal
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-200">
      <Card
        title="Patient Management System"
        subTitle="Sign In"
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button label="Sign In" className="w-full mb-3 p-button-rounded" onClick={handleLogin} />
        <p className="text-center text-gray-500">Don't have an account?</p>
        <Button
          label="Register"
          className="p-button-text w-full text-blue-500"
          onClick={handleRegisterRedirect}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
