"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from './../../../lib/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",  
  });

  const router = useRouter()
  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data)
    if(result.status === "success"){
      router.push('/matches')
    }else {
      toast.error(result.error as string);
      
    }
  };

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
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Login;
