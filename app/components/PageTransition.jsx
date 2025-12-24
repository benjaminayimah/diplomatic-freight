'use client'
import { motion } from 'framer-motion';
import { useEffect, useState, useRef} from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

const anim = (variants) => ({
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants
});

const routes = {
  "/": "Home",
  "/get-a-quote": "Get a Quote",
  "/terms-of-service": "Terms of Service",
  "/privacy-policy": "Privacy Policy",
  "/cookie-policy": "Cookie Policy"
};
const greetings = [
 "Hello",        // English — USA / UK
  "Bonjour",      // French — France
  "مرحبا",         // Arabic — Middle East / North Africa
  "Hola",         // Spanish — Spain
  "Hallo",        // German — Germany
  "Γειά σου",     // Greek — Greece
  "Ciao",         // Italian — Italy
  "Olá",          // Portuguese — Portugal
  "こんにちは",     // Japanese — Japan
  "你好",          // Chinese (Mandarin) — China
  "안녕하세요",      // Korean — South Korea
  "Akwaaba",      // Twi — Ghana
];

function PageTransition({ children }) {
  const pathname = usePathname();

  const [showContent, setShowContent] = useState(false);
  const [introText, setIntroText] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const greetingIndex = useRef(0);

  // 2. Freeze on first greeting
  const freezeTime = 500; // ms
  const cycleInterval = 300; // ms per greeting
  const remainingGreetings = greetings.length - 1; // because first is already shown
  const totalCycleTime = remainingGreetings * cycleInterval;

  const curtonTimeOut = isFirstLoad && pathname === '/' ? totalCycleTime + (freezeTime * 2) : cycleInterval

  useEffect(() => {
    if (isFirstLoad && pathname !== "/") {
      setIsFirstLoad(false);
    }

    if (isFirstLoad && pathname === "/") {
      // 1. Show "Hello" immediately
      setIntroText(greetings[0]);
      greetingIndex.current = 1; // start cycling from the second greeting

      const freezeTimeout = setTimeout(() => {
        // 3. Start cycling through the rest
        const interval = setInterval(() => {
          setIntroText(greetings[greetingIndex.current]);
          greetingIndex.current = (greetingIndex.current + 1) % greetings.length;
        }, cycleInterval);

        // Stop cycling after all remaining greetings have been shown
        const stopTimeout = setTimeout(() => {
          clearInterval(interval);
          // Freeze on the final greeting
          setIntroText(greetings[greetingIndex.current]);
        }, totalCycleTime);

        // Cleanup inner timers
        return () => {
          clearInterval(interval);
          clearTimeout(stopTimeout);
        };
      }, freezeTime);

      return () => clearTimeout(freezeTimeout);
    }

    // Normal navigation
    setIntroText(routes[pathname]);
  }, [pathname]);


  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), curtonTimeOut); // after curtain slides up
    return () => {
      clearTimeout(timeout);
      setShowContent(false);
    };
  }, [pathname]);

  const textVariants = {
    initial: { opacity: 1, y: 0 },
    enter: {
      opacity: 0,
      y: '-100vh',
      transition: {
        duration: 0.8,
        delay: curtonTimeOut / 1000, // convert ms to seconds
        ease: [0.76, 0, 0.24, 1]
      }
    },
  };

  // Curtain animation: slides up to reveal content
  const curtainVariants = {
    initial: { y: 0 },
    enter: {
      y: '-100vh',
      transition: {
        duration: 0.9,
        delay: curtonTimeOut / 1000 + 0.15, // slight offset for smoothness
        ease: [0.76, 0, 0.24, 1]
      }
    },
  };


  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full">
        <motion.div
          {...anim(curtainVariants)}
          className="fixed inset-0 w-full h-full bg-[#0A47C9] z-40"
        />
        {
          introText && (
            <motion.h1
              {...anim(textVariants)}
              className="fixed z-50 text-white text-[2rem] md:text-[3rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className='intro'>{introText}</div>
            </motion.h1>
          )
        }
        { showContent && children }
      </div>
    </AnimatePresence>
  );
}

export default PageTransition;
