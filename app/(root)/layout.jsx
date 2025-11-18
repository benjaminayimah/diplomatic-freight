
import { ReactLenis } from 'lenis/react'
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import CookieConsent from '../components/CookieConsent'

export default function RootLayout({ children }) {
  return (
   <ReactLenis root>
    <main id='app'>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </main>
   </ReactLenis>
  );
}