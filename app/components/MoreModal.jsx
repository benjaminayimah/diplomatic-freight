"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";

const MoreModal = ({
  isOpen,
  onClose,
  maxWidth = "600px",
  dismissibleOutsideClick = true,
  children,
}) => {
  const modalRef = useRef(null);
  const scrollPosition = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    scrollPosition.current = window.scrollY;

    const { body, documentElement } = document;

    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";

      window.scrollTo({
        top: scrollPosition.current,
        behavior: "auto",
      });
    };
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen || !dismissibleOutsideClick) return;

    const handlePointerDown = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, dismissibleOutsideClick, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  const modalAnimation = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: {
          y: 100,
          scale: 0.95,
          opacity: 0,
        },
        animate: {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        exit: {
          y: 100,
          scale: 0.95,
          opacity: 0,
        },
        transition: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="more_modal"
          key="overlay"
          data-lenis-prevent
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            fixed inset-0 z-50
            flex justify-center
            overflow-y-auto
            overscroll-contain
            bg-black/60
            backdrop-blur-2xl
            py-10 sm:py-16
          "
        >
          <div
            style={{ maxWidth }}
            className="relative w-[90%] h-fit pb-20"
          >
            <motion.div
              ref={modalRef}
              {...modalAnimation}
              role="dialog"
              aria-modal="true"
              className="
                relative
                min-h-25
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-lg
                md:rounded-4xl
              "
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  absolute right-4 top-4 z-20
                  grid h-10 w-10 place-items-center
                  rounded-full
                  bg-black/70
                  transition-colors duration-300
                  hover:bg-black/90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22.627"
                  height="22.627"
                  viewBox="0 0 22.627 22.627"
                  aria-hidden="true"
                >
                  <path
                    d="M6.679,14.68V9.322H1.322a1.322,1.322,0,0,1,0-2.644H6.679V1.322a1.321,1.321,0,1,1,2.642,0V6.679h5.357a1.322,1.322,0,1,1,0,2.644H9.321V14.68a1.321,1.321,0,1,1-2.642,0Z"
                    transform="translate(-0.001 11.313) rotate(-45)"
                    fill="#fff"
                  />
                </svg>
              </button>

              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MoreModal;