import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  banks: [],
  invoices: [],
  subscribers: [],
  quotes: [],
  receipts: [],
  token: null,
  isAuth: false,

  setAuth: (user, token) =>
    set({ user, token, isAuth: true }),

  setAuthData: (profile, invoices, banks, subscribers, quotes, receipts) =>
    set({ profile, invoices, banks, subscribers, quotes, receipts }),

  setUserData: (user) =>
    set((state) => ({ user: { ...state.user, ...user } })),

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

  setReceipts: (receiptArr) =>
      set(() => ({
        receipts: Array.isArray(receiptArr) ? receiptArr : [],
      })),

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
  setReceiptData: (newReceiptObj) =>
    set((state) => {
      const exists = state.receipts.some((rec) => rec.id === newReceiptObj.id);
      const updatedReceipts = exists
        ? state.receipts.map((rec) =>
            rec.id === newReceiptObj.id ? { ...rec, ...newReceiptObj } : rec
          )
        : [...state.receipts, newReceiptObj];
      return { receipts: updatedReceipts };
    }),
  setDeleteInvoiceById: (id) => 
    set((state) => ({ invoices: state.invoices.filter((b) => b.id !== id) })),

  setDeleteQuoteById: (id) => 
    set((state) => ({ quotes: state.quotes.filter((q) => q.id !== id) })),

  setDeleteSubscriberById: (id) => 
    set((state) => ({ subscribers: state.subscribers.filter((q) => q.id !== id) })),

  setDeleteReceiptById: (id) => 
    set((state) => ({ receipts: state.receipts.filter((b) => b.id !== id) })),

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
    const { user, profile, banks, invoices, subscribers, quotes, receipts, token, isAuth } = state;
    localStorage.setItem("auth", JSON.stringify({ user, profile, banks, invoices, subscribers, quotes, receipts, token, isAuth }));
  });
}
