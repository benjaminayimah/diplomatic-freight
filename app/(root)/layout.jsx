'use client';

import React from 'react';
import { useUIStore } from '@/store';
import { ReactLenis } from 'lenis/react'
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import CookieConsent from '../components/CookieConsent'
import PageTransition from '../components/PageTransition';

export default function RootLayout({ children }) {
  const { device } = useUIStore();

  return (
    <ReactLenis
      root
      autoRaf={device !== 'mobile'}
      options={{
        duration: 1.2,
        smoothWheel: device !== 'mobile',
        smoothTouch: false,
        lerp: 0.08,
      }}
    >
      <main id="app">
        <PageTransition>
        <Header />
          {children}
        <Footer />
        <CookieConsent />
        </PageTransition>
      </main>
    </ReactLenis>
  );
}
