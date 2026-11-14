import { useAudioPlayer } from '../hooks/useAudioPlayer'
export function OpeningScreen(){const audio=useAudioPlayer();return <button type="button" onClick={audio.startFromGesture} aria-label="进入网站并播放音乐">ENTER</button>}
