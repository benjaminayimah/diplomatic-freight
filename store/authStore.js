
import { create } from "zustand";
// import { jwtDecode } from "jwt-decode";
import { startTokenExpiryTimer, clearTokenExpiryTimer } from "@/utils/tokenExpiry";
import { useUIStore } from "@/store";

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  payments: [],
  invoices: [],
  invoicesLastFetched: null,
  subscribers: [],
  subscribersLastFetched: null,
  quotes: [],
  quotesLastFetched: null,
  receipts: [],
  receiptsLastFetched: null,
  token: null,
  isAuth: false,
  // expiresAt: null,

  setAuth: (user, token) => {
    startTokenExpiryTimer(token, () => {
      useUIStore.getState().setTokenExpired();
    });

    set({
      user,
      token,
      isAuth: true,
      // expiresAt: jwtDecode(token).exp * 1000
    });
  },

  setAuthData: (profile, invoices, payments, subscribers, quotes, receipts) =>
    set({ profile, invoices, payments, subscribers, quotes, receipts }),

  setUserData: (user) =>
    set((state) => ({ user: { ...state.user, ...user } })),

  setCompanyData: (payload) =>
    set((state) => ({ profile: { ...state.profile, ...payload } })),

  setPaymentData: (newPaymentObj) =>
    set((state) => {
      const exists = state.payments.some((payment) => payment.id === newPaymentObj.id);
      const updatedPayments = exists
        ? state.payments.map((payment) =>
            payment.id === newPaymentObj.id ? { ...payment, ...newPaymentObj } : payment
          )
        : [...state.payments, newPaymentObj];
      return { payments: updatedPayments };
    }),

  setDeletePaymentById: (id) =>
    set((state) => ({ payments: state.payments.filter((p) => p.id !== id) })),

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

  setLogout: () => {
    clearTokenExpiryTimer();

    set({
      user: null,
      profile: null,
      payments: [],
      invoices: [],
      subscribers: [],
      quotes: [],
      receipts: [],
      token: null,
      isAuth: false,
    });
  },

  
  loadAuth: () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("auth");

      if (data) {
        const auth = JSON.parse(data);

        set(auth);

        if (auth.token) {
          startTokenExpiryTimer(auth.token, () => {
            useUIStore.getState().setTokenExpired();
          });
        }
      }
    }
  },
}));

// Automatically sync localStorage whenever the store changes
if (typeof window !== "undefined") {
  useAuthStore.subscribe((state) => {
    const { user, profile, payments, invoices, subscribers, quotes, receipts, token, isAuth } = state;
    localStorage.setItem("auth", JSON.stringify({ user, profile, payments, invoices, subscribers, quotes, receipts, token, isAuth }));
  });
}

// import { create } from "zustand";
// import { startTokenExpiryTimer, clearTokenExpiryTimer } from "@/utils/tokenExpiry";
// import { useUIStore } from "@/store";
// import api from "@/services/apiService";


// export const useAuthStore = create((set, get) => ({

//   user: null,
//   profile: null,

//   payments: [],

//   invoices: [],
//   invoicesLastFetched: null,

//   subscribers: [],
//   subscribersLastFetched: null,

//   quotes: [],
//   quotesLastFetched: null,

//   receipts: [],
//   receiptsLastFetched: null,

//   token: null,
//   isAuth: false,


//   /*
//     AUTH
//   */

//   setAuth: (user, token) => {

//     startTokenExpiryTimer(token, () => {
//       useUIStore.getState().setTokenExpired();
//     });


//     set({
//       user,
//       token,
//       isAuth: true,
//     });

//   },


//   setAuthData: (
//     profile,
//     invoices,
//     payments,
//     subscribers,
//     quotes,
//     receipts
//   ) =>

//     set({

//       profile,

//       invoices,
//       payments,
//       subscribers,
//       quotes,
//       receipts,


//       invoicesLastFetched: Date.now(),
//       subscribersLastFetched: Date.now(),
//       quotesLastFetched: Date.now(),
//       receiptsLastFetched: Date.now(),

//     }),



//   /*
//     GENERIC RESOURCE HANDLING
//   */


//   setResource: (key, data) =>
//     set((state) => {

//       const updated = Array.isArray(data)
//         ? data
//         : [];


//       return {
//         [key]: updated,
//         [`${key}LastFetched`]: Date.now(),
//       };

//     }),
    

//   fetchResource: async ({
//     key,
//     endpoint,
//     force = false,
//     sort = true,
//   }) => {


//     const state = get();


//     const data = state[key];

//     const lastFetched =
//       state[`${key}LastFetched`];

//     const stale =
//       !lastFetched ||
//       Date.now() - lastFetched > 5 * 60 * 1000;



//     // use cached data
//     if (
//       !force &&
//       data?.length &&
//       !stale
//     ) {

//       return data;

//     }



//     const res = await api.get(endpoint);



//     let items =
//       res.data[key] || [];



//     if(sort){

//       items = [...items].sort(
//         (a,b)=>
//           new Date(b.createdAt) -
//           new Date(a.createdAt)
//       );

//     }

//     set({

//       [key]: items,

//       [`${key}LastFetched`]:
//         Date.now(),

//     });
//     return items;

//   },




//   /*
//     USER / PROFILE
//   */


//   setUserData: (user) =>

//     set((state)=>({

//       user:{
//         ...state.user,
//         ...user
//       }

//     })),



//   setCompanyData: (payload)=>

//     set((state)=>({

//       profile:{
//         ...state.profile,
//         ...payload
//       }

//     })),




//   /*
//     PAYMENTS
//   */


//   setPaymentData: (newPaymentObj)=>

//     set((state)=>{

//       const exists =
//         state.payments.some(
//           payment =>
//             payment.id === newPaymentObj.id
//         );


//       return {

//         payments: exists

//           ? state.payments.map(payment =>
//               payment.id === newPaymentObj.id
//               ? {
//                   ...payment,
//                   ...newPaymentObj
//                 }
//               : payment
//             )

//           : [
//               ...state.payments,
//               newPaymentObj
//             ]

//       };

//     }),



//   setDeletePaymentById:(id)=>

//     set((state)=>({

//       payments:
//         state.payments.filter(
//           p=>p.id !== id
//         )

//     })),




//   /*
//     EXISTING RESOURCE SETTERS
//   */


//   // setInvoices:(invoiceArr)=>

//   //   set({

//   //     invoices:
//   //       Array.isArray(invoiceArr)
//   //       ? invoiceArr
//   //       : [],

//   //     invoicesLastFetched:
//   //       Date.now()

//   //   }),



//   // setReceipts:(receiptArr)=>

//   //   set({

//   //     receipts:
//   //       Array.isArray(receiptArr)
//   //       ? receiptArr
//   //       : [],

//   //     receiptsLastFetched:
//   //       Date.now()

//   //   }),



//   // setQuotes:(quoteArr)=>

//   //   set({

//   //     quotes:
//   //       Array.isArray(quoteArr)
//   //       ? quoteArr
//   //       : [],

//   //     quotesLastFetched:
//   //       Date.now()

//   //   }),



//   // setSubscribers:(subscriberArr)=>

//   //   set({

//   //     subscribers:
//   //       Array.isArray(subscriberArr)
//   //       ? subscriberArr
//   //       : [],

//   //     subscribersLastFetched:
//   //       Date.now()

//   //   }),




//   /*
//     ADD / UPDATE
//   */


//   setInvoiceData:(newInvoiceObj)=>

//     set((state)=>{

//       const exists =
//         state.invoices.some(
//           inv=>inv.id === newInvoiceObj.id
//         );


//       return {

//         invoices: exists

//         ? state.invoices.map(inv=>
//             inv.id === newInvoiceObj.id
//             ? {
//                 ...inv,
//                 ...newInvoiceObj
//               }
//             : inv
//           )

//         : [
//             ...state.invoices,
//             newInvoiceObj
//           ],

//       };

//     }),




//   setReceiptData:(newReceiptObj)=>

//     set((state)=>{

//       const exists =
//         state.receipts.some(
//           rec=>rec.id === newReceiptObj.id
//         );


//       return {

//         receipts: exists

//         ? state.receipts.map(rec=>
//             rec.id === newReceiptObj.id
//             ? {
//                 ...rec,
//                 ...newReceiptObj
//               }
//             : rec
//           )

//         : [
//             ...state.receipts,
//             newReceiptObj
//           ]

//       };

//     }),




//   /*
//     DELETE
//   */


//   setDeleteInvoiceById:(id)=>

//     set((state)=>({

//       invoices:
//         state.invoices.filter(
//           inv=>inv.id !== id
//         )

//     })),



//   setDeleteQuoteById:(id)=>

//     set((state)=>({

//       quotes:
//         state.quotes.filter(
//           q=>q.id !== id
//         )

//     })),



//   setDeleteSubscriberById:(id)=>

//     set((state)=>({

//       subscribers:
//         state.subscribers.filter(
//           s=>s.id !== id
//         )

//     })),



//   setDeleteReceiptById:(id)=>

//     set((state)=>({

//       receipts:
//         state.receipts.filter(
//           r=>r.id !== id
//         )

//     })),




//   /*
//     LOGOUT
//   */


//   setLogout:()=>{

//     clearTokenExpiryTimer();


//     set({

//       user:null,
//       profile:null,

//       payments:[],

//       invoices:[],
//       subscribers:[],
//       quotes:[],
//       receipts:[],

//       invoicesLastFetched:null,
//       subscribersLastFetched:null,
//       quotesLastFetched:null,
//       receiptsLastFetched:null,


//       token:null,
//       isAuth:false,

//     });

//   },




//   /*
//     LOAD FROM LOCAL STORAGE
//   */


//   loadAuth:()=>{

//     if(typeof window !== "undefined"){

//       const data =
//         localStorage.getItem("auth");


//       if(data){

//         const auth =
//           JSON.parse(data);


//         set(auth);



//         if(auth.token){

//           startTokenExpiryTimer(
//             auth.token,
//             ()=>{
//               useUIStore
//               .getState()
//               .setTokenExpired();
//             }
//           );

//         }

//       }

//     }

//   },


// }));





// /*
//   LOCAL STORAGE SYNC
// */


// if(typeof window !== "undefined"){

//   useAuthStore.subscribe((state)=>{


//     const {

//       user,
//       profile,

//       payments,

//       invoices,
//       invoicesLastFetched,

//       subscribers,
//       subscribersLastFetched,

//       quotes,
//       quotesLastFetched,

//       receipts,
//       receiptsLastFetched,

//       token,
//       isAuth,

//     } = state;



//     localStorage.setItem(
//       "auth",
//       JSON.stringify({

//         user,
//         profile,

//         payments,

//         invoices,
//         invoicesLastFetched,

//         subscribers,
//         subscribersLastFetched,

//         quotes,
//         quotesLastFetched,

//         receipts,
//         receiptsLastFetched,

//         token,
//         isAuth,

//       })
//     );


//   });

// }
