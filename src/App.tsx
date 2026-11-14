import { useState } from 'react'
import { Header } from './components/Header'
import { OpeningScreen } from './components/OpeningScreen'
import { HeroSection } from './components/HeroSection'
import { ProducerProfile } from './components/ProducerProfile'
import { SocialLinks } from './components/SocialLinks'
import { BgmPlayer } from './components/BgmPlayer'
import { Footer } from './components/Footer'
import { AudioPlayerProvider } from './hooks/useAudioPlayer'
import type { Locale } from './types'
function getSavedLocale():Locale{try{return localStorage.getItem('saki-locale')==='ja'?'ja':'zh'}catch{return 'zh'}}
export default function App(){const[locale,setLocale]=useState<Locale>(getSavedLocale);const toggleLocale=()=>setLocale(v=>{const n=v==='zh'?'ja':'zh';try{localStorage.setItem('saki-locale',n)}catch{/* Continue in memory if storage is blocked. */}return n});return <AudioPlayerProvider><OpeningScreen/><Header locale={locale} onToggleLocale={toggleLocale}/><main><HeroSection locale={locale}/><ProducerProfile locale={locale}/><SocialLinks locale={locale}/><BgmPlayer locale={locale}/></main><Footer locale={locale}/></AudioPlayerProvider>}
