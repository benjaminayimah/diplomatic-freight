// src/hooks/useAuth.js
import {
  loginUser,
  updateUser,
  logoutUser,
  updatePassword,
  updateCompanyProfile,
  createOrUpdateBank,
  deleteBankAccount,
} from "@/services/authService";

import { createOrUpdateInvoice, deleteInvoice, createOrGenerateReceipt, deleteReceipt } from "@/services/invoiceService";
import { createQuote, deleteQuote } from "@/services/quoteService";
import { deleteSubscriber } from "@/services/subscriberService";

export const useAuth = () => {

  const login = async (credentials) => {
    
    try {
      const response = await loginUser(credentials); // must return this
      return response;
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  };

  const update = async (credentials, id) => {
    try {
      const response = await updateUser(credentials, id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  };


  const updatePass = async (credentials) => {
    try {
      const response = await updatePassword(credentials);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const updateProfile = async (credentials, id) => {
    try {
      const response = await updateCompanyProfile(credentials, id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const createBankOrUpdate = async (credentials) => {
    try {
      const response = await createOrUpdateBank(credentials);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const deleteBank = async (id) => {
    try {
      const response = await deleteBankAccount(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const invoiceDelete = async (id) => {
    try {
      const response = await deleteInvoice(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }


  const createInvoiceOrUpdate = async (credentials) => {
    try {
      const response = await createOrUpdateInvoice(credentials);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const receiptDelete = async (id) => {
    try {
      const response = await deleteReceipt(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const createReceiptOrGenerate = async (credentials) => {
    try {
      const response = await createOrGenerateReceipt(credentials);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }
  


  const quoteCreate = async (id) => {
    try {
      const response = await createQuote(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const quoteDelete = async (id) => {
    try {
      const response = await deleteQuote(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }

  const subscriberDelete = async (id) => {
    try {
      const response = await deleteSubscriber(id);
      return response
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  }





  // const register = async (credentials) => {
    
  //   try {
  //     const response = await registerUser(credentials); // must return this
  //     return response;
  //   } catch (error) {
  //     return error.response?.data || { error: "Network error" };
  //   }
  // };

  const logout = async () => {
    
    try {
      const response = await logoutUser(); // must return this
      return response;
    } catch (error) {
      return error.response?.data || { error: "Network error" };
    }
  };

  return {
    login,
    update,
    updatePass,
    updateProfile,
    createBankOrUpdate,
    deleteBank,
    createInvoiceOrUpdate,
    invoiceDelete,
    quoteDelete,
    createReceiptOrGenerate,
    receiptDelete,
    quoteCreate,
    subscriberDelete,
    logout
  };
};
