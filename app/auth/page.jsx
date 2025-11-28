
import React from 'react'
import GuestRoute from '@/app/components/GuestRoute';
import LoginForm from '@/app/components/LoginForm';

function Login() {

  return (
    <GuestRoute>
      <LoginForm />
    </GuestRoute>
  )
}
export default Login