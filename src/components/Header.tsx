import { Menu, Music2 } from 'lucide-react'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import type { Locale } from '../types'
export function Header({locale,onToggleLocale}:{locale:Locale;onToggleLocale:()=>void}){const audio=useAudioPlayer();return <header className="header"><a className="brand" href="#top" aria-label="Saki Producer Card"><b>S</b><span>/01</span></a><nav><button className="locale-toggle" onClick={onToggleLocale} aria-label={locale==='zh'?'切换语言':'言語を切り替え'}>{locale==='zh'?'中 / 日':'日 / 中'}</button><button className="header-audio-button" onClick={audio.toggle} aria-label={audio.playing?'暂停音乐':'播放音乐'}><Music2/></button><a href="#social" aria-label={locale==='zh'?'社交链接':'SNS'}><Menu/></a></nav></header>}
