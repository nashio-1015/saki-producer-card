import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { musicConfig } from '../config/music'

type AudioState = {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  available: boolean | null
  error: boolean
  needsInteraction: boolean
  toggle: () => void
  setMuted: (value: boolean) => void
  setVolume: (value: number) => void
  seek: (value: number) => void
}

const AudioContext = createContext<AudioState | null>(null)

export function useAudioPlayer() {
  const value = useContext(AudioContext)
  if (!value) throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  return value
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement>(null)
  const autoPlayAttempted = useRef(false)
  const autoPlayTimer = useRef<number | null>(null)
  const resumeOnVisible = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMutedState] = useState<boolean>(musicConfig.startMuted)
  const [volume, setVolumeState] = useState<number>(musicConfig.initialVolume)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [error, setError] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)

  const attemptPlayback = useCallback((audio: HTMLAudioElement) => {
    audio.muted = muted
    audio.volume = volume
    void audio.play().then(() => {
      setAvailable(true)
      setError(false)
      setNeedsInteraction(false)
    }).catch((reason: unknown) => {
      setPlaying(false)
      const blocked = reason instanceof DOMException && reason.name === 'NotAllowedError'
      const cancelled = reason instanceof DOMException && reason.name === 'AbortError'
      if (blocked) {
        setAvailable(true)
        setNeedsInteraction(true)
        setError(false)
      } else if (!cancelled) {
        setNeedsInteraction(false)
        setError(true)
      }
    })
  }, [muted, volume])

  useEffect(() => {
    const audio = ref.current
    if (!audio) return
    audio.muted = musicConfig.startMuted
    audio.volume = musicConfig.initialVolume
    audio.preload = 'none'

    const onTime = () => setCurrentTime(audio.currentTime || 0)
    const onDuration = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      setAvailable(true)
    }
    const onPlay = () => {
      setPlaying(true)
      setAvailable(true)
      setError(false)
      setNeedsInteraction(false)
    }
    const onPause = () => setPlaying(false)
    const onError = () => {
      setPlaying(false)
      setAvailable(false)
      setError(true)
      setNeedsInteraction(false)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('durationchange', onDuration)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('durationchange', onDuration)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
    }
  }, [])

  useEffect(() => {
    if (!musicConfig.autoPlay || autoPlayAttempted.current) return
    const audio = ref.current
    if (!audio) return

    const timer = window.setTimeout(() => {
      autoPlayTimer.current = null
      if (autoPlayAttempted.current) return
      autoPlayAttempted.current = true
      attemptPlayback(audio)
    }, musicConfig.autoPlayDelayMs)
    autoPlayTimer.current = timer

    return () => {
      window.clearTimeout(timer)
      if (autoPlayTimer.current === timer) autoPlayTimer.current = null
    }
  }, [attemptPlayback])

  useEffect(() => {
    if (ref.current) ref.current.muted = muted
  }, [muted])

  useEffect(() => {
    if (ref.current) ref.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!musicConfig.pauseWhenHidden) return
    const onVisibility = () => {
      const audio = ref.current
      if (!audio) return
      if (document.hidden) {
        resumeOnVisible.current = !audio.paused
        if (resumeOnVisible.current) audio.pause()
        return
      }
      if (resumeOnVisible.current) {
        resumeOnVisible.current = false
        attemptPlayback(audio)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [attemptPlayback])

  const toggle = useCallback(() => {
    const audio = ref.current
    if (!audio) return
    autoPlayAttempted.current = true
    if (autoPlayTimer.current !== null) {
      window.clearTimeout(autoPlayTimer.current)
      autoPlayTimer.current = null
    }
    if (!audio.paused) {
      audio.pause()
      return
    }
    if (available === false) {
      setError(true)
      return
    }
    attemptPlayback(audio)
  }, [available, attemptPlayback])

  const setMuted = useCallback((value: boolean) => setMutedState(value), [])
  const setVolume = useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value))
    setVolumeState(next)
    if (next > 0) setMutedState(false)
  }, [])
  const seek = useCallback((value: number) => {
    const audio = ref.current
    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = Math.max(0, Math.min(audio.duration, value))
    }
  }, [])

  const value = useMemo(() => ({
    playing, muted, volume, currentTime, duration, available, error, needsInteraction,
    toggle, setMuted, setVolume, seek,
  }), [playing, muted, volume, currentTime, duration, available, error, needsInteraction, toggle, setMuted, setVolume, seek])

  return (
    <AudioContext.Provider value={value}>
      <audio ref={ref} src={musicConfig.src} preload="none" muted={musicConfig.startMuted} />
      {children}
    </AudioContext.Provider>
  )
}
