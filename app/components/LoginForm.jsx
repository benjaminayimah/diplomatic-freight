'use client'

import React, { useState } from 'react'
import Input from '@/app/components/Input'
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from 'next/navigation';
import ErrorCard from '@/app/components/ErrorCard';
import SubmitButton from '@/app/components/SubmitButton';
import RippleButton from './RippleButton';
import VerifyFooter from './dashboard/VerifyFooter';

function LoginForm() {

  const router = useRouter()
  const { setAuth } = useAuthStore();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({}); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset previous errors
    setError(null);
    setLoading(true)
    
    const response = await login(form);
    setLoading(false)

    if (response?.success) {
      setAuth(
        response.user,
        response.token);
        router.push("/app");
    } else if (response?.errors) {
      const fieldErrors = {};

      response.errors.forEach(err => {
        fieldErrors[err.path] = fieldErrors[err.path] || [];
        fieldErrors[err.path].push(err.msg);
      });
      setErrors(fieldErrors);

    } else if(response?.error) {
      setError(response.error);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className='bg-gray-200 p-6 flex justify-center items-center min-h-screen'>
      <div className="max-w-120 w-full">
        <div className='bg-white shadow-2xs min-h-100 w-full px-8 sm:px-10 py-10 rounded-3xl mb-10'>
          <div className='mb-10'>
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <span>Enter your email and password to continue.</span>
          </div>
          { error && <ErrorCard error={error} /> }
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-4'>
              <Input
                label="Email"
                id="email"
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                errors={errors.email || []}
                onFocus={() => setErrors(prev => ({ ...prev, email: [] }))}
                className="focus:border-black"
                autoComplete="on"
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={form.password}
                autoComplete="off"
                placeholder="Enter password"
                maxLength={30}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="focus:border-black"
                errors={errors.password || []}
                onFocus={() => setErrors(prev => ({ ...prev, password: [] }))}
              />
            </div>
            <SubmitButton loading={loading} className={'myHover-translate bg-blue-600 hover:bg-blue-700 text-white'}>
              Log in
            </SubmitButton>
            <a href="/" className='h-10 grid place-items-center bg-gray-100 border border-gray-200 hover:bg-gray-200 text-black px-4 py-2 rounded-4xl text-[0.88rem] font-medium '>Back home</a>
          </form>
          {/* <RippleButton loading={loading} type="submit" className={'bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2 flex items-center justify-center font-semibold text-[0.88rem] rounded-4xl min-w-21.5 transition duration-300'}>
            Log in
          </RippleButton> */}
        </div>
        <VerifyFooter />
      </div>
    </section>
  )
}

export default LoginForm