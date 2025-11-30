import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  banks: [],
  invoices: [],
  subscribers: [],
  quotes: [],
  token: null,
  isAuth: false,

  setAuth: (user, profile, invoices, banks, subscribers, quotes, token) =>
    set({ user, profile, invoices, banks, subscribers, quotes, token, isAuth: true }),

  setUserData: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),

  setCompanyData: (payload) =>
    set((state) => ({ profile: { ...state.profile, ...payload } })),

  setBankData: (newBankObj) =>
    set((state) => {
      const exists = state.banks.some((bank) => bank.id === newBankObj.id);
      const updatedBanks = exists
        ? state.banks.map((bank) =>
            bank.id === newBankObj.id ? { ...bank, ...newBankObj } : bank
          )
        : [...state.banks, newBankObj];
      return { banks: updatedBanks };
    }),

  setDeleteBankById: (id) =>
    set((state) => ({ banks: state.banks.filter((b) => b.id !== id) })),


  setInvoices: (invoiceArr) =>
    set(() => ({
      invoices: Array.isArray(invoiceArr) ? invoiceArr : [],
    })),

  setQuotes: (quoteArr) =>
    set(() => ({
      quotes: Array.isArray(quoteArr) ? quoteArr : [],
    })),

  setSubscribers: (subscriberArr) =>
    set(() => ({
      subscribers: Array.isArray(subscriberArr) ? subscriberArr : [],
    })),

  setInvoiceData: (newInvoiceObj) =>
    set((state) => {
      const exists = state.invoices.some((inv) => inv.id === newInvoiceObj.id);
      const updatedInvoices = exists
        ? state.invoices.map((inv) =>
            inv.id === newInvoiceObj.id ? { ...inv, ...newInvoiceObj } : inv
          )
        : [...state.invoices, newInvoiceObj];
      return { invoices: updatedInvoices };
    }),
  setDeleteInvoiceById: (id) => 
    set((state) => ({ invoices: state.invoices.filter((b) => b.id !== id) })),

  setDeleteQuoteById: (id) => 
    set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) })),

  setDeleteSubscriberById: (id) => 
    set((state) => ({ subscribers: state.subscribers.filter((q) => q.id !== id) })),

  setLogout: () => set({ user: null, profile: null, banks: [], invoices: [], subscribers: [], token: null, isAuth: false }),

  loadAuth: () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("auth");
      if (data) set(JSON.parse(data));
    }
  },
}));

// Automatically sync localStorage whenever the store changes
if (typeof window !== "undefined") {
  useAuthStore.subscribe((state) => {
    const { user, profile, banks, invoices, subscribers, quotes, token, isAuth } = state;
    localStorage.setItem("auth", JSON.stringify({ user, profile, banks, invoices, subscribers, quotes, token, isAuth }));
  });
}
