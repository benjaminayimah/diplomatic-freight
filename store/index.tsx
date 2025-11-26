import { create } from 'zustand'

/** Device type categories */
export type Device = 'mobile' | 'tablet' | 'desktop' | ''

/** Global UI store shape */
type UIStore = {
  device: Device
  width: number
  height: number
  mobileMenu: boolean
  toggleMenu: () => void
  computeWindow: (width: number, height: number) => void
}

/** Zustand store definition */
export const useUIStore = create<UIStore>((set) => ({
  device: '',
  width: 0,
  height: 0,
  mobileMenu: false,

  // ✅ You forgot to define toggleMenu in your type earlier
  toggleMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),

  computeWindow: (width, height) => {
    let device: Device = 'tablet'

    if (width < 768) device = 'mobile'
    else if (width > 1344) device = 'desktop'

    // Optional but nice: update <body> or #app class for responsive styling
    document.getElementById('app')?.setAttribute('class', device)

    // ✅ Keep store in sync
    set({ device, width, height })
  },
}))
