import { create } from 'zustand'

/** Device type categories */
export type Device = 'mobile' | 'tablet' | 'desktop' | ''

/** Payment method type */
export type PaymentMethod = {
  label: string
  value: string
}

export type Currency = {
  label: string
  value: string
}

export type USDTNetwork = {
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
  currencies: Currency[]
  usdtNetworks: USDTNetwork[]
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
  currencies: [
    { label: "US Dollar (USD)", value: "USD" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "British Pound (GBP)", value: "GBP" },
    { label: "Ghanaian Cedi (GHS)", value: "GHS" },
    { label: "Chinese Yuan (CNY)", value: "CNY" },
    { label: "Japanese Yen (JPY)", value: "JPY" },
    { label: "Canadian Dollar (CAD)", value: "CAD" },
    { label: "Australian Dollar (AUD)", value: "AUD" },
    { label: "Nigerian Naira (NGN)", value: "NGN" }
  ],
  
  paymentMethods: [
    { label: "Bank Transfer", value: "bank_transfer" },
    { label: "USDT Wallet", value: "usdt_wallet" },
    { label: "Cash", value: "cash", disabled: true },
  ],

  usdtNetworks: [
    { label: "Tron (TRC-20)", value: "trc20" },
    { label: "Ethereum (ERC-20)", value: "erc20" },
    { label: "Binance Smart Chain (BEP-20)", value: "bep20" },
    { label: "Solana (SPL)", value: "solana" },
    { label: "TON (Jetton)", value: "ton" },
    { label: "Polygon (MATIC)", value: "polygon" },
    { label: "Avalanche (ARC-20)", value: "avalanche" },
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
