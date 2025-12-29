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

  console.log("Current device:", device);

  return (
    <ReactLenis
      root
      autoRaf={device !== 'mobile'} // keeps Lenis synced with requestAnimationFrame 
      options={{
        duration: 1.2,
        smoothWheel: device !== 'mobile',
        smoothTouch: false,
        lerp: 0.08,
      }}
      // root
      // autoRaf={true} // keeps Lenis synced with requestAnimationFrame
      // options={{
      //   // 👇 Tweaked values for smoother, less jumpy experience
      //   duration: 1.2,      // Easing duration (higher = smoother, lower = snappier)
      //   smoothWheel: true,
      //   smoothTouch: false,
      //   syncTouch: true,    // Helps when scrolling with touch + wheel mix
      //   touchMultiplier: 1.2,
      //   lerp: 0.08,         // Leave this if you like your current easing feel
      // }}
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
