
import { ReactLenis } from 'lenis/react'
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

export default function RootLayout({ children }) {
  return (
   <ReactLenis root>
    <main id='app'>
      <Header />
      {children}
      <Footer />
    </main>
   </ReactLenis>
  );
}