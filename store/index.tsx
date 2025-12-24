import { create } from 'zustand'

/** Device type categories */
export type Device = 'mobile' | 'tablet' | 'desktop' | ''

/** Payment method type */
export type PaymentMethod = {
  label: string
  value: string
}

/** Global UI store shape */
type UIStore = {
  device: Device
  width: number
  height: number
  mobileMenu: boolean
  tokenExpired: boolean
  paymentMethods: PaymentMethod[]
  toggleMenu: () => void
  setTokenExpired: () => void
  computeWindow: (width: number, height: number) => void
}

/** Zustand store definition */
export const useUIStore = create<UIStore>((set) => ({
  device: '',
  width: 0,
  height: 0,
  mobileMenu: false,
  tokenExpired: false,

  paymentMethods: [
    { label: "Bank Transfer", value: "bank_transfer" },
    // { label: "USDT Wallet", value: "usdt_wallet" },
    // { label: "Cash", value: "cash" },
  ],

  toggleMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),
  setTokenExpired: () => set(() => ({ tokenExpired: true })),

  computeWindow: (width, height) => {
    let device: Device = 'tablet'

    if (width < 768) device = 'mobile'
    else if (width > 1344) device = 'desktop'

    document.getElementById('app')?.setAttribute('class', device)

    set({ device, width, height })
  },
}))
