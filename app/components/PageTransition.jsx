'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const routes = {
  '/': 'Home',
  '/get-quote': 'Get a Quote',
  '/terms-of-service': 'Terms of Service',
  '/privacy-policy': 'Privacy Policy',
  '/cookie-policy': 'Cookie Policy',
};

const greetings = [
  'Hello',
  'Bonjour',
  'مرحبا',
  'Hola',
  'Hallo',
  'Γειά σου',
  'Ciao',
  'Olá',
  'こんにちは',
  '你好',
  '안녕하세요',
  'Akwaaba',
];

const FREEZE_TIME = 400;
const CYCLE_INTERVAL = 120;

const getAnimationProps = (variants) => ({
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants,
});

function PageTransition({ children }) {
  const pathname = usePathname();

  const [showContent, setShowContent] = useState(false);
  const [introText, setIntroText] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isHome = pathname === '/';

  const remainingGreetings = greetings.length - 1;
  const totalCycleTime = remainingGreetings * CYCLE_INTERVAL;

  const curtainTimeout =
    isFirstLoad && isHome
      ? totalCycleTime + FREEZE_TIME * 2
      : CYCLE_INTERVAL;

  /**
   * Handle greeting / route text
   */
  useEffect(() => {
    let freezeTimeout;
    let interval;
    let stopTimeout;

    if (isHome) {
      // Show first greeting immediately
      setIntroText(greetings[0]);

      let greetingIndex = 1;

      // Freeze on "Hello" before cycling
      freezeTimeout = setTimeout(() => {
        interval = setInterval(() => {
          setIntroText(greetings[greetingIndex]);

          greetingIndex =
            (greetingIndex + 1) % greetings.length;
        }, CYCLE_INTERVAL);

        // Stop cycling after all greetings
        stopTimeout = setTimeout(() => {
          clearInterval(interval);

          // Freeze on final greeting
          setIntroText(greetings[greetings.length - 1]);
        }, totalCycleTime);
      }, FREEZE_TIME);
    } else {
      // Normal page navigation
      setIntroText(routes[pathname]);
      // Once we've navigated away from the homepage,
      // subsequent transitions use the shorter duration.
      setIsFirstLoad(false);
    }

    return () => {
      clearTimeout(freezeTimeout);
      clearTimeout(stopTimeout);
      clearInterval(interval);
    };
  }, [pathname, isHome, totalCycleTime]);

  /**
   * Reveal page content after curtain timing
   */
  useEffect(() => {
    setShowContent(false);

    const timeout = setTimeout(() => {
      setShowContent(true);
    }, curtainTimeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, curtainTimeout]);

  const textVariants = {
    initial: {
      opacity: 1,
      y: 0,
    },

    enter: {
      opacity: 0,
      y: '-100vh',
      transition: {
        duration: 0.9,
        delay: curtainTimeout / 1000,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  };

  const curtainVariants = {
    initial: {
      y: 0,
    },

    enter: {
      y: '-100vh',
      transition: {
        duration: 0.9,
        delay: curtainTimeout / 1000 + 0.15,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathname}
        className="relative w-full"
      >
        {/* Curtain */}
        <motion.div
          {...getAnimationProps(curtainVariants)}
          className="
            fixed inset-0 z-40
            h-full w-full
            bg-[#0A47C9]
          "
        />

        {/* Intro / Route title */}
        {introText && (
          <motion.h1
            {...getAnimationProps(textVariants)}
            className="
              fixed left-1/2 top-1/2 z-50
              -translate-x-1/2 -translate-y-1/2
              text-[2rem] text-white
              md:text-[3rem]
            "
          >
            <span className="intro whitespace-nowrap">
              {introText}
            </span>
          </motion.h1>
        )}

        {/* Page content */}
        {showContent && children}
      </div>
    </AnimatePresence>
  );
}

export default PageTransition;