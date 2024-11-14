"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/lib/schemas/RegisterSchema';
import { registerUser } from '@/app/actions/authActions';

const Register = () => {
  const { register, handleSubmit, setError, formState: { isValid, errors } } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",  
  });

  const onSubmit = async (
    data: RegisterSchema
  ) => {
    const result = await registerUser(data);
    if (result.status === "success") {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          console.log("e::: ", e);
          const fieldName = e.path.join(".") as
            | "email"
            | "name"
            | "password";
          setError(fieldName, {
            message: e.message,
          });
        });
      } else {
        setError("root.serverError", {
          message: result.error,
        });
      }
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
        <p className="text-gray-500">Welcome back to Match Me</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input 
            placeholder="Name" 
            {...register('name')}
            className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input 
            type="email" 
            placeholder="Email" 
            {...register('email')}
            className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input 
            type="password" 
            placeholder="Password" 
            {...register('password')}
            className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default Register;
