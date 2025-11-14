'use client'

import { useUIStore } from "../store"


function MobileMenu() {
const { mobileMenu } = useUIStore()

  return (
    <>
        <aside className={`mobile-menu flex justify-start items-center ${mobileMenu ? 'menu-open' : 'menu-close'}`}>
            <div className="menu-wrapper flex-1">
                <div>
                    <p>Menu</p>
                    <ul className="flex flex-column gap-8">
                        <a href="#" className="overflow-hidden relative block">
                            <div className="absolute">Home</div>
                            <p className="absolute">Home</p>
                        </a>
                        <a href="#" className="overflow-hidden relative block">
                            <div className="absolute">Features</div>
                            <p className="absolute">Features</p>
                        </a>
                        <a href="#" className="overflow-hidden relative block">
                            <div className="absolute">Resources</div>
                            <p className="absolute">Resources</p>
                        </a>
                    </ul>
                </div>
            </div>
        </aside>
        <div className={`overlay ${mobileMenu ? 'show-overlay' : ''}`}/>
    </>
  )
}

export default MobileMenu