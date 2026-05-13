import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from './translations'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  isAr: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  isAr: false,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    // Apply RTL to the document root
    const root = document.documentElement
    root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
    root.setAttribute('lang', l)
    // Switch font
    if (l === 'ar') {
      root.style.setProperty('--font-family', '"IBM Plex Sans Arabic", "Plus Jakarta Sans", sans-serif')
    } else {
      root.style.setProperty('--font-family', '"Plus Jakarta Sans", sans-serif')
    }
  }

  useEffect(() => {
    // Apply initial dir
    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
