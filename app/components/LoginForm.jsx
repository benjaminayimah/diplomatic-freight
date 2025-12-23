'use client'

import React, { useState } from 'react'
import Input from '@/app/components/Input'
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from 'next/navigation';
import ErrorCard from '@/app/components/ErrorCard';
import SubmitButton from '@/app/components/SubmitButton';

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
    <section className='bg-gray-200 flex justify-center items-center min-h-screen'>
      <div className="max-w-[550px] pb-20 w-full px-6">
        <div className='bg-white min-h-100 w-full p-10 rounded-2xl my-[5vw]'>
          <div className='mb-10'>
            <h1 className="text-2xl font-bold mb-2">Log in</h1>
            <span>Provide your credentials to log in.</span>
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
            <SubmitButton loading={loading} className={'bg-black text-white'}>
              Log in
            </SubmitButton>
            <a href="/" className='myHover-translate h-10 grid place-items-center bg-gray-100 border border-gray-200 hover:bg-gray-200 text-black px-4 py-2 rounded-4xl text-[0.88rem] font-medium '>Back home</a>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm