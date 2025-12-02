"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ message: "", type: "info", isOpen: false });
  const [animate, setAnimate] = useState(false);

  const showSnackbar = useCallback((message, type = "info", duration = 3000) => {
    // Show snackbar
    setSnackbar({ message, type, isOpen: true });
    
    // Animate in
    setTimeout(() => setAnimate(true), 10);

    // Animate out
    setTimeout(() => setAnimate(false), duration);

    // Remove from DOM after animation completes (300ms)
    setTimeout(() => setSnackbar(prev => ({ ...prev, isOpen: false })), duration + 300);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {snackbar.isOpen && (
        <div
          className={`snackbar 
            fixed z-60 bg-[#1A1B1D] min-w-[340px] max-w-[600px]  bottom-5 left-1/2 transform -translate-x-1/2
            px-4 py-3 rounded-[10px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.28)]
            transition-all duration-300 ease-in-out
            ${animate ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
          `}
        >
          <div className="flex gap-2 items-center">
            <Icon type={snackbar.type} />
            <span className="text-white text-sm font-medium">
              {snackbar.message}
            </span>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

const icons = {
  success: (
    <svg className="shrink-0" width="22" height="22" viewBox="0 0 28 28">
        <path d="M-1985.9,23.9A13.908,13.908,0,0,1-1990,14a13.91,13.91,0,0,1,4.1-9.9A13.907,13.907,0,0,1-1976,0a13.908,13.908,0,0,1,9.9,4.1A13.91,13.91,0,0,1-1962,14a13.908,13.908,0,0,1-4.1,9.9A13.908,13.908,0,0,1-1976,28,13.907,13.907,0,0,1-1985.9,23.9Zm1.414-18.385A11.924,11.924,0,0,0-1988,14a11.924,11.924,0,0,0,3.515,8.485A11.924,11.924,0,0,0-1976,26a11.924,11.924,0,0,0,8.486-3.514A11.924,11.924,0,0,0-1964,14a11.924,11.924,0,0,0-3.515-8.486A11.924,11.924,0,0,0-1976,2,11.924,11.924,0,0,0-1984.486,5.514Zm6.162,13.856-4.539-4.487a.928.928,0,0,1-.017-1.311.928.928,0,0,1,1.311-.016l3.823,3.79L-1970.5,8.7a.928.928,0,0,1,1.307-.114.927.927,0,0,1,.115,1.306l-7.891,9.414a.93.93,0,0,1-.664.331h-.046A.93.93,0,0,1-1978.323,19.371Z" transform="translate(1990)" fill="#34C759"/>
    </svg>
  ),
  error: (
    <svg className="shrink-0" width="22" height="22" viewBox="0 0 28 28">
      <path d="M-1985.9,23.9A13.908,13.908,0,0,1-1990,14a13.91,13.91,0,0,1,4.1-9.9A13.907,13.907,0,0,1-1976,0a13.908,13.908,0,0,1,9.9,4.1A13.91,13.91,0,0,1-1962,14a13.908,13.908,0,0,1-4.1,9.9A13.908,13.908,0,0,1-1976,28,13.907,13.907,0,0,1-1985.9,23.9Zm1.414-18.385A11.924,11.924,0,0,0-1988,14a11.924,11.924,0,0,0,3.515,8.485A11.924,11.924,0,0,0-1976,26a11.924,11.924,0,0,0,8.486-3.514A11.924,11.924,0,0,0-1964,14a11.924,11.924,0,0,0-3.515-8.486A11.924,11.924,0,0,0-1976,2,11.924,11.924,0,0,0-1984.486,5.514Zm12.811,14.792-4.656-4.657-4.537,4.538a.951.951,0,0,1-1.344,0,.951.951,0,0,1,0-1.344l4.537-4.538-4.42-4.419a.951.951,0,0,1,0-1.344.949.949,0,0,1,1.343,0l4.419,4.419,4.538-4.538a.952.952,0,0,1,1.345,0,.951.951,0,0,1,0,1.344l-4.539,4.538,4.657,4.657a.952.952,0,0,1,0,1.344.948.948,0,0,1-.672.278A.95.95,0,0,1-1971.674,20.307Z" transform="translate(1990)" fill="#FF3B30"/>
    </svg>
  ),
  info: (
    <svg className="shrink-0" width="22" height="22" viewBox="0 0 23.998 23.998">
      <path d="M-3408.486-1063.519A11.921,11.921,0,0,1-3412-1072a11.921,11.921,0,0,1,3.514-8.484A11.921,11.921,0,0,1-3400-1084a11.921,11.921,0,0,1,8.484,3.515A11.921,11.921,0,0,1-3388-1072a11.921,11.921,0,0,1-3.514,8.484A11.917,11.917,0,0,1-3400-1060,11.917,11.917,0,0,1-3408.486-1063.519ZM-3410-1072a10.01,10.01,0,0,0,10,10,10.01,10.01,0,0,0,10-10,10.01,10.01,0,0,0-10-10A10.01,10.01,0,0,0-3410-1072Zm9,4.4v-4.4a1,1,0,0,1,1-1,1,1,0,0,1,1,1v4.4a1,1,0,0,1-1,1A1,1,0,0,1-3401-1067.6Zm1-7.8a1,1,0,0,1-1-1,1,1,0,0,1,1-1h.011a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3412 1084.002)" fill="#0077FF"/>
    </svg>
  ),
  default: (
    <svg className="shrink-0" width="22" height="22" viewBox="0 0 23.998 23.998">
      <path d="M-3408.486-1063.519A11.921,11.921,0,0,1-3412-1072a11.921,11.921,0,0,1,3.514-8.484A11.921,11.921,0,0,1-3400-1084a11.921,11.921,0,0,1,8.484,3.515A11.921,11.921,0,0,1-3388-1072a11.921,11.921,0,0,1-3.514,8.484A11.917,11.917,0,0,1-3400-1060,11.917,11.917,0,0,1-3408.486-1063.519ZM-3410-1072a10.01,10.01,0,0,0,10,10,10.01,10.01,0,0,0,10-10,10.01,10.01,0,0,0-10-10A10.01,10.01,0,0,0-3410-1072Zm9,4.4v-4.4a1,1,0,0,1,1-1,1,1,0,0,1,1,1v4.4a1,1,0,0,1-1,1A1,1,0,0,1-3401-1067.6Zm1-7.8a1,1,0,0,1-1-1,1,1,0,0,1,1-1h.011a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3412 1084.002)" fill="#fff"/>
    </svg>
  ),
};

const Icon = ({ type }) => icons[type] || icons.default;