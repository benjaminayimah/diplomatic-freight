'use client';

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MoreModal = ({
  isOpen,
  onClose,
  maxWidth = "600px",
  dismissibleOutsideClick = true,
  children
}) => {
  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!dismissibleOutsideClick) return;

    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handler);
      document.documentElement.classList.add("no-smooth-scroll");

      // --- Scroll Lock ---
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handler);

      // --- Scroll Unlock ---
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      // Restore scroll instantly
      window.scrollTo({
        top: parseInt(scrollY || "0") * -1,
        behavior: "auto",
      });

      document.documentElement.classList.remove("no-smooth-scroll");
    };
  }, [isOpen, onClose]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='
          backdrop-blur-2xl
          overscroll-contain
          pointer-events-auto
          bg-black/60 
          fixed inset-0 flex py-10 sm:py-16 justify-center z-50 
          overflow-y-auto h-screen
          '
        >
          {/* Modal Panel */}
          <div style={{ maxWidth }} className="w-[90%] absolute pb-20">
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ y: 150,  scale: 0.8 }}
              animate={{ y: 0,  scale: 1  }}
              exit={{ y: 150,  scale: 0.8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-4xl shadow-lg  min-h-[100px]"
            >
              <div className="sticky h-0 top-0 z-10 flex justify-end">
                <button onClick={onClose} aria-label="Close" className='h-10 w-10 mt-4 mr-4 rounded-3xl grid place-items-center bg-black/70 hover:bg-black/90 transition-transform duration-400'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22.627" height="22.627" viewBox="0 0 22.627 22.627">
                    <path d="M6.679,14.68V9.322H1.322a1.322,1.322,0,0,1,0-2.644H6.679V1.322a1.321,1.321,0,1,1,2.642,0V6.679h5.357a1.322,1.322,0,1,1,0,2.644H9.321V14.68a1.321,1.321,0,0,1-2.642,0Z" transform="translate(-0.001 11.313) rotate(-45)" fill="#fff"/>
                  </svg>
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoreModal;
