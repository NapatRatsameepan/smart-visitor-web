import { create } from 'zustand'

interface LanguageState {
  lang: string
  setLang: (lang: string) => void
  isTH: boolean
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'TH',
  isTH: true,
  setLang: (lang) => set({ lang, isTH: lang === 'TH' }),
}))
