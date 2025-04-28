import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth.js";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Register Successfully");
      navigate("/login");
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (data) => {
    console.log(data)
    mutation.mutate(data);
    
  };
  return (
    <AuthComponent>
      <h1 className="mb-6 text-center text-2xl font-bold text-[var(--primary-text-color)]">
        Sign Up
      </h1>
      {error && (
            <p className=" text-red-500 text-center text-sm my-2">{error}</p>
          )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <Input
            type="text"
            register={register}
            errors={errors}
            name="username"
            placeholder="Username"
            required={true}
          />
          <Input
            type="password"
            register={register}
            errors={errors}
            name="password"
            placeholder="Password"
            required={true}
            pattern={/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/} // Strong password pattern
          />
        </div>
        <div>
        <Button
          className="py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white"
          disabled={mutation?.isPending}
        >{mutation?.isPending ? "Loading..." : "Sign Up"}</Button>
        <Link className="text-[14px] text-[var(--primary-text-color)] underline" to='/login' >I have account</Link>
        </div>
        
      </form>
    </AuthComponent>
  );
};

export function AuthComponent({ children }) {
  return (
    <main className="flex items-center justify-center bg-[var(--bg-color)] min-h-screen p-4">
      <section className="w-full max-w-md bg-[var(--input-bg)] rounded-2xl p-8 shadow-md border border-[var(--border-color)]">
        {children}
      </section>
    </main>
  );
}

export default Register;
