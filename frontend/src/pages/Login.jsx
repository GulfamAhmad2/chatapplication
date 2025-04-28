import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthComponent } from "./Register.jsx";
import Button from "../components/Button.jsx";
import { useForm } from "react-hook-form";
import Input from "../components/Input.jsx";

const Login = () => {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log("Loging attempting");
      toast.success("Login Successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("Error: " + error);
      setError(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <AuthComponent>
      <h1 className="mb-6 text-center text-2xl font-bold text-[var(--primary-text-color)]">
        Sign In
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

          />
        </div>
        <div>
          <Button
            className="py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white"
            disabled={mutation?.isPending}
          >{mutation?.isPending ? "Loading..." : "Sign In"}</Button>
          <Link className="text-[14px] text-[var(--primary-text-color)] underline" to="/signup">Don't have account</Link>
        </div>
      </form>
    </AuthComponent>
  );
};

export default Login;
