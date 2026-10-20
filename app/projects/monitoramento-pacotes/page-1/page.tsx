import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Network, Radio, ScanLine } from "lucide-react"
import { PacketDemoVideo } from "@/components/packet-demo-video"

export const metadata: Metadata = {
  title: "Monitoramento de pacotes | Diogo Antunes",
  description: "Demonstração de captura de tráfego em uma rede local, com foco na observação de pacotes e na análise da comunicação entre dispositivos.",
}

const stages = [
  { number: "01", title: "Capturar", text: "Registrar o tráfego observado na interface de rede durante a demonstração.", icon: Radio },
  { number: "02", title: "Observar", text: "Examinar os endereços de origem e destino e os protocolos presentes nos pacotes.", icon: ScanLine },
  { number: "03", title: "Analisar", text: "Relacionar o tráfego capturado às atividades realizadas na rede local.", icon: Network },
]

export default function PacketMonitoringPage() {
  return (
    <main className="relative min-h-screen">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
        <nav aria-label="Navegação do projeto" className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 font-mono text-xs">
          <Link href="/#work" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"><ArrowLeft size={14} /> Voltar aos projetos</Link>
          <span className="text-muted-foreground">DIOGO ANTUNES <span className="text-accent">/</span> PROJETO 05</span>
        </nav>

        <header className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Análise de tráfego de rede</p>
            <h1 className="mt-6 text-5xl leading-[1.05] tracking-tight md:text-7xl">Monitoramento<br />de <span className="text-muted-foreground">pacotes.</span></h1>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-muted-foreground">Uma visão prática da comunicação em rede. Este projeto apresenta uma captura de tráfego realizada na minha rede local, com gravação de tela para demonstrar a observação dos pacotes.</p>
            <a href="#demonstracao" className="mt-8 inline-flex items-center gap-3 border border-accent px-5 py-3 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-accent-foreground">Ver demonstração <ArrowUpRight size={16} /></a>
          </div>
          <dl className="space-y-5 border-l border-border pl-6 font-mono text-xs">
            <div><dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Ambiente</dt><dd className="mt-2">Rede local</dd></div>
            <div><dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Formato</dt><dd className="mt-2">Captura de tráfego + gravação de tela</dd></div>
            <div><dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Foco</dt><dd className="mt-2">Comunicação entre dispositivos</dd></div>
          </dl>
        </header>

        <section id="demonstracao" className="scroll-mt-10 border-t border-border/60 pt-10" aria-labelledby="video-title">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">01 / Em tela</p><h2 id="video-title" className="mt-3 text-3xl tracking-tight md:text-4xl">A rede em movimento.</h2></div><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Demonstração prática</span></div>
          <div className="overflow-hidden border border-border/70"><PacketDemoVideo /></div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">Use os controles para pausar, avançar e ampliar a gravação enquanto acompanha a captura. O vídeo registra o cenário observado durante a demonstração.</p>
        </section>

        <section aria-labelledby="approach-title" className="py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">02 / O processo</p>
          <h2 id="approach-title" className="mt-3 text-3xl tracking-tight md:text-4xl">Da captura à leitura do tráfego.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{stages.map(({ number, title, text, icon: Icon }) => <article key={number} className="border border-border/60 bg-background/80 p-7"><div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{number}</span><Icon size={20} strokeWidth={1.5} className="text-accent" /></div><h3 className="mt-8 text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </section>

        <section aria-labelledby="purpose-title" className="grid gap-6 border-y border-border/60 py-10 md:grid-cols-2">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">03 / Objetivo</p><h2 id="purpose-title" className="mt-3 text-3xl tracking-tight">Entender o que circula na rede.</h2></div>
          <p className="text-sm leading-7 text-muted-foreground">A captura de pacotes permite observar como os dispositivos trocam informações e oferece contexto para investigar conectividade. A proposta é documentar esse processo em um ambiente local e tornar a análise mais fácil de acompanhar.</p>
        </section>
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>Redes / Documentação prática</span><Link href="/projects/powershell-commands/page-1" className="inline-flex items-center gap-2 hover:text-accent">Biblioteca PowerShell <ArrowUpRight size={14} /></Link></footer>
      </div>
    </main>
  )
}
