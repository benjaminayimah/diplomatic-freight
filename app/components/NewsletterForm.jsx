'use client'

import React, { useState } from 'react'
import { createSubscriber } from '@/services/subscriberService';
import { useSnackbar } from "@/app/components/SnackbarContext"; 



function NewsletterForm() {
  
  const { showSnackbar } = useSnackbar()

  const [form, setForm] = useState({ email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSubscriber(form);
      showSnackbar("You have subscribed to our newsletter successfully!", "success");
      setForm({ email: '' });
    } catch (error) {
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;
        errors.find(err => err.path === 'email' && err.msg == 'subscribed') ? showSnackbar(
          "You are already subscribed to our newsletter.",
          "info"
        ) :  
        showSnackbar(
          "Validation error. Please check your inputs",
          "error"
        )
      }
      else showSnackbar(
        'Subscription failed. Please try again.',
        "error"
      )
    }
  };

  return (
    <form onSubmit={handleSubmit} id='newsletter_form' name='newsletter' className='flex overflow-hidden gap-1 rounded-4xl relative w-full max-w-100 md:w-100'>
        <input
          value={form.email ?? ''}
          onChange={(e) => setForm({ email: e.target.value })}
          name="email" type="email"
          className='w-full bg-transparent text-[1rem] rounded-3xl'
          placeholder='Enter your email'
          autoComplete='on'
        />
        <button className='flex justify-center px-4 h-11 rounded-4xl items-center gap-2 bg-[#0A47C9] text-white shrink-0'>
            <span className='text-[0.9rem] font-medium'>Subscribe</span>
            <svg height="12" viewBox="0 0 7 12" fill="none" >
                <path d="M0.719687 11.5303C0.426784 11.2375 0.426769 10.7626 0.719653 10.4697L5.18934 5.99971L0.719687 1.53035C0.426784 1.23746 0.426768 0.76259 0.719652 0.469687C1.01254 0.176784 1.48741 0.176769 1.78031 0.469652L6.78031 5.46933C6.92097 5.60997 6.99999 5.80074 7 5.99965C7.00001 6.19856 6.921 6.38933 6.78035 6.52999L1.78035 11.5303C1.48746 11.8232 1.01259 11.8232 0.719687 11.5303Z" fill="white"/>
            </svg>
        </button>
    </form>
  )
}

export default NewsletterForm