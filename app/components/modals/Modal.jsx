'use client';

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({
  isOpen,
  onClose,
  title,
  subTitle,
  maxWidth = "600px",
  dismissibleOutsideClick = true,
  dismissibleEsc = true,
  overlayClasses = '',
  ModalFooter,
  Icon = null,
  children
}) => {
  const modalRef = useRef(null);

  // Close when clicking outside

  useEffect(() => {
  if (!isOpen) return;

    const handleMouseDown = (e) => {
      if (
        dismissibleOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (dismissibleEsc && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, dismissibleOutsideClick]);

  useEffect(() => {
  if (!isOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
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
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1], 
            }}
            className="bg-white rounded-3xl w-[90%] shadow-lg overflow-hidden relative border border-white"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full bg-white/50 backdrop-blur-sm px-6 pt-6 pb-2 z-60">
              {title && (
                <div className="flex items-center gap-2">
                  { Icon && <Icon strokeWidth={2} className="h-5" /> }
                  <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {subTitle && (
                      <span className="text-sm text-gray-500">{subTitle}</span>
                    )}
                  </div>
                </div>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="
                  group absolute right-3.5 top-3.5
                  text-gray-500 hover:bg-gray-100 hover:text-black
                  h-8 w-8 rounded-full grid place-items-center
                  transition duration-300 text-xl
                "
              >
                <XMarkIcon strokeWidth={2} className="h-5 w-5" />
              </button>
            </div>
            {/* Modal Body */}
            <div className={`h-full px-6 overflow-y-auto max-h-[80svh] mt-15 ${ModalFooter ? 'pb-24' : 'pb-6'}`}>
              {children}
            </div>
            { ModalFooter && (
              <div className="absolute bottom-0 left-0 w-full px-6 pt-2 pb-6 bg-white/30 backdrop-blur-sm z-60">
                {ModalFooter}
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-linear-to-t from-white/90 to-transparent z-50 pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
