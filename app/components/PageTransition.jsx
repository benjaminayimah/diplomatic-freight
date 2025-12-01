'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
// import useWindowSize from '@/app/hooks/useWindowSize'
import { useUIStore } from '../../store/index'



const anim = (variants) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants
    }
}

const routes = {
  "/": "Welcome",
  "/about": "About",
  "/contact": "Contact",
  "/projects": "Projects"
}


function PageTransition({children}) {

  // const { width, height } = useWindowSize();
  const { device, width, height } = useUIStore()

  const curveHeight = device === 'mobile' ? 400 : 600

  const pathname = usePathname();

  const [showContent, setShowContent] = useState(false); 
  
  useEffect(() => {

    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 600); // match duration of your enter animation

    return () => {
      clearTimeout(timeout);
      setShowContent(false); // hide content before transition replays
    };
  }, [pathname]);
  
  const text = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0,
      top: -100,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: '60%'
      }
    },
    exit: {
      opacity: 1,
      top: '50%',
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.3,
      }
    }
  }
  
  
  return (
    <div className='curve'>
      <motion.p {...anim(text)} className='text-[3rem] absolute z-9999 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{routes[pathname]}</motion.p>
      {/* <div style={{opacity: width > 0 ? 0 : 1}} className='page-background'></div> */}
      {width <= 0 && <div className="page-background"></div>}
      { width > 0 && <SVG width={width} height={height} curveHeight={curveHeight} /> }
      { showContent && children }
    </div>
  )
}

const SVG = ({width, height, curveHeight}) => {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + curveHeight} 0 ${height + 300}
    L0 300
  
  `
  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 300
  `
  const curve = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }
  const slide = {
    initial: {
      top: '-300px'
    },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: '100vh'
      }
    },
    exit: {
      top: "-300px",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }
  return (
    <motion.svg {...anim(slide)} className="svg">
      <motion.path {...anim(curve)} fill='#101010'></motion.path>
    </motion.svg>
  )
}

export default PageTransition