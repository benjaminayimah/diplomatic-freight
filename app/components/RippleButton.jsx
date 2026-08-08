'use client';

import { useState } from 'react';
import Loader from './Loader'

export default function RippleButton({
  children,
  className = '',
  type = 'button',
  onClick,
  loading,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    const ripple = {
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 500);

    onClick?.(e);
  };

  if (loading) {
    return (
      <div
       className='
       bg-gray-100 px-4 py-3 font-semibold
        rounded-4xl h-10 flex items-center
        justify-center min-w-21.5 text-[0.88rem] 
        text-gray-500 gap-2
      '
      >
        <Loader size={20} />
        {children}
      </div>
    )
  }

  return (
    <button
      {...props}
      type={type}
      onClick={createRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}