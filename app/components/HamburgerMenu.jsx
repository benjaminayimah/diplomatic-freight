'use client'

import styles from '../styles/hamburger.module.css'

import { useUIStore } from "../../store"



function HamburgerMenu() {
    const { mobileMenu, toggleMenu } = useUIStore()

    return (
      <button 
        id='menu_trigger' 
        className={`myHover-translate block rounded-3xl bg-white/60 hover:bg-white/90 transition-colors duration-300 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.19)] backdrop-blur-[6.50px] ${styles.hamburger_menu} ${mobileMenu && styles.collapse} flex flex-column items-center justify-center`} 
        onClick={toggleMenu} 
        arial-controls="menu" 
        aria-label='Menu trigger' 
        aria-expanded={mobileMenu}
        >
        <div />
      </button>
    )
}

export default HamburgerMenu