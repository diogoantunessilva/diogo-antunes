"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"

export function PacketDemoVideo() {
  const [unavailable, setUnavailable] = useState(false)
  const [attempt, setAttempt] = useState(0)

  if (unavailable) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-5 bg-black/50 p-8 text-center" role="status">
        <Play size={32} strokeWidth={1} className="text-accent" aria-hidden="true" />
        <div><p className="text-lg">Vídeo indisponível no momento</p><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">A demonstração será exibida aqui assim que estiver disponível.</p></div>
        <button type="button" onClick={() => { setUnavailable(false); setAttempt((value) => value + 1) }} className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs hover:border-accent"><RotateCcw size={14} /> Tentar novamente</button>
      </div>
    )
  }

  return <video key={attempt} controls playsInline preload="metadata" onError={() => setUnavailable(true)} aria-label="Demonstração de captura de pacotes na rede local" className="aspect-video w-full bg-black" src="/downloads/monitoramento-pacotes.mp4"><p>Seu navegador não suporta a reprodução deste vídeo.</p></video>
}
