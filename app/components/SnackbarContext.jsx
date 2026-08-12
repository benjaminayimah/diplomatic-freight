"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";


const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "info",
    isOpen: false,
    autoDismiss: true,
  });

  const [animate, setAnimate] = useState(false);

  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const hideSnackbar = useCallback(() => {
    clearTimers();

    setAnimate(false);

    timers.current.push(
      setTimeout(() => {
        setSnackbar((prev) => ({
          ...prev,
          isOpen: false,
        }));
      }, 300)
    );
  }, [clearTimers]);

  const showSnackbar = useCallback(
    (
      message,
      type = "info",
      autoDismiss = true
    ) => {
      const duration = 3000
      clearTimers();

      // Reset animation state
      setAnimate(false);

      setSnackbar({
        message,
        type,
        isOpen: true,
        autoDismiss,
      });

      // Animate in
      timers.current.push(
        setTimeout(() => {
          setAnimate(true);
        }, 10)
      );

      if (!autoDismiss) return;

      // Animate out
      timers.current.push(
        setTimeout(() => {
          setAnimate(false);
        }, duration)
      );

      // Remove from DOM
      timers.current.push(
        setTimeout(() => {
          setSnackbar((prev) => ({
            ...prev,
            isOpen: false,
          }));
        }, duration + 300)
      );
    },
    [clearTimers]
  );

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}

      {snackbar.isOpen && (
        <div
          className={`
            fixed z-9999 left-1/2 -translate-x-1/2
            bottom-[max(1.25rem,env(safe-area-inset-bottom))]
            w-[calc(100%-2rem)] sm:w-auto max-w-lg
            bg-[#1A1B1D] px-4 py-3 rounded-xl
            shadow-[0px_2px_16px_rgba(0,0,0,0.28)]
            transition-all duration-300 ease-in-out
            ${
              animate
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }
          `}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon type={snackbar.type} />
              <span className="flex-1 text-sm font-medium text-white wrap-break-word">
                {snackbar.message}
              </span>
            </div>

            {!snackbar.autoDismiss && (
              <button
                onClick={hideSnackbar}
                className="shrink-0 text-white/70 hover:text-white transition"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

const icons = {
  success: (
    <CheckCircleIcon strokeWidth={2} stroke="#34C759" className="shrink-0 h-7 w-7" />
  ),

  error: (
    <ExclamationTriangleIcon strokeWidth={2} stroke="#FF3B30" className="shrink-0 h-6 w-6" />
  ),

  info: (
    <InformationCircleIcon strokeWidth={2} stroke="#0077FF" className="shrink-0 h-7 w-7" />
  ),

  default: (
    <InformationCircleIcon strokeWidth={2} stroke="#fff" className="shrink-0 h-7 w-7" />
  ),
};

const Icon = ({ type }) => icons[type] || icons.default;