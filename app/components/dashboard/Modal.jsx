'use client';

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  title,
  subTitle,
  maxWidth = "600px",
  dismissibleOutsideClick = true,
  overlayClasses = '',
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
      // document.documentElement.classList.add("no-smooth-scroll");

      // // --- Scroll Lock ---
      // const scrollY = window.scrollY;
      // document.body.style.position = "fixed";
      // document.body.style.top = `-${scrollY}px`;
      // document.body.style.left = "0";
      // document.body.style.right = "0";
      // document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handler);

      // // --- Scroll Unlock ---
      // const scrollY = document.body.style.top;
      // document.body.style.position = "";
      // document.body.style.top = "";
      // document.body.style.left = "";
      // document.body.style.right = "";
      // document.body.style.overflow = "";

      // // Restore scroll instantly
      // window.scrollTo({
      //   top: parseInt(scrollY || "0") * -1,
      //   behavior: "auto",
      // });

      // document.documentElement.classList.remove("no-smooth-scroll");
    };
  }, [isOpen, onClose]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${overlayClasses} fixed inset-0 bg-black/50 flex items-center justify-center z-50`}
        >
          {/* Modal Panel */}
          <motion.div
            key="modal"
            ref={modalRef}
            style={{ maxWidth }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-2xl w-[90%] p-6 shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between pb-2">
              {title && (
                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  {subTitle && (
                    <span className="text-sm text-gray-500">{subTitle}</span>
                  )}
                </div>
              )}
              <div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="group text-gray-500 hover:text-black text-xl"
                >
                  <svg height="12" viewBox="0 0 12 12">
                    <path
                      className="fill-gray-500 group-hover:fill-black"
                      d="M10.5369 0.251055C10.8716 -0.0836849 11.4142 -0.0836849 11.749 0.251055C12.0837 0.5858 12.0837 1.12841 11.749 1.46312L7.21209 6.00002L11.749 10.5369C12.0837 10.8717 12.0837 11.4143 11.749 11.749C11.4143 12.0837 10.8717 12.0837 10.5369 11.749L6.00002 7.21209L1.46312 11.749C1.12841 12.0837 0.5858 12.0837 0.251055 11.749C-0.0836849 11.4142 -0.0836849 10.8716 0.251055 10.5369L4.78795 6.00002L0.251055 1.46312C-0.0836849 1.12839 -0.0836849 0.585794 0.251055 0.251055C0.585794 -0.0836849 1.12839 -0.0836849 1.46312 0.251055L6.00002 4.78795L10.5369 0.251055Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="h-full overflow-y-auto max-h-[76svh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
