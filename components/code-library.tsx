"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, Check, Code2, Copy, Search, Terminal } from "lucide-react"
import { codeLibrary, type CodeExample } from "@/lib/code-library"

const categories = ["Todos", ...new Set(codeLibrary.map((item) => item.category))]
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

export function CodeLibrary() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todos")
  const items = codeLibrary.filter((item) =>
    (category === "Todos" || item.category === category) &&
    normalize(`${item.title} ${item.description} ${item.category} ${item.code}`).includes(normalize(query.trim())),
  )

  return (
    <main className="relative min-h-screen">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
        <nav aria-label="Navegação" className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 font-mono text-xs">
          <Link href="/#work" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"><ArrowLeft size={14} /> Voltar aos projetos</Link>
          <span className="uppercase tracking-widest text-muted-foreground">Diogo Antunes <span className="text-accent">/</span> Biblioteca</span>
        </nav>

        <header className="grid gap-10 border-b border-border/60 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Automação e sistemas Windows</p>
            <h1 className="mt-6 text-5xl leading-[1.05] tracking-tight md:text-7xl">Comandos úteis.<br /><span className="text-muted-foreground">PowerShell.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Uma biblioteca de scripts para consultar, adaptar e usar no dia a dia. Explore o código, copie um comando ou baixe o arquivo completo.</p>
          </div>
          <div className="flex items-center gap-5 border-l border-accent/60 pl-6">
            <span className="text-5xl tracking-tight">{String(codeLibrary.length).padStart(2, "0")}</span>
            <span className="font-mono text-[10px] uppercase leading-5 tracking-widest text-muted-foreground">Scripts disponíveis<br />Windows / PowerShell</span>
          </div>
        </header>

        <section aria-label="Buscar na biblioteca" className="py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoria">
              {categories.map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={`border px-4 py-2.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-accent ${category === name ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"}`}>{name}</button>)}
            </div>
            <label className="flex w-full items-center gap-3 border border-border bg-background/80 px-4 py-3 focus-within:border-accent md:max-w-sm">
              <Search size={16} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Buscar scripts</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, comando ou assunto…" className="w-full bg-transparent font-mono text-xs outline-none" />
            </label>
          </div>
          <p role="status" className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{items.length} {items.length === 1 ? "arquivo encontrado" : "arquivos encontrados"}</p>
        </section>

        <section aria-label="Scripts disponíveis" className="grid items-start gap-6 lg:grid-cols-2">
          {items.map((item) => <ScriptCard key={item.id} item={item} />)}
          {items.length === 0 && <div className="border border-dashed border-border p-10 lg:col-span-2"><h2 className="text-xl">Nenhum script encontrado.</h2><p className="mt-2 text-sm text-muted-foreground">Tente outro termo ou limpe os filtros.</p><button type="button" onClick={() => { setQuery(""); setCategory("Todos") }} className="mt-5 text-sm text-accent underline">Limpar filtros</button></div>}
        </section>

        <aside className="my-12 flex items-start gap-4 border border-border/60 bg-card/50 p-6">
          <Terminal size={20} className="mt-1 shrink-0 text-accent" />
          <div><h2 className="text-sm">Como usar os arquivos</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Baixe o arquivo e abra o PowerShell na pasta onde ele foi salvo. Confira o código e execute o comando indicado em cada item. Os exemplos desta coleção consultam informações e não alteram configurações do Windows.</p></div>
        </aside>
        <footer className="flex flex-wrap justify-between gap-4 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>Biblioteca em construção / v.01</span><Link href="/#work" className="inline-flex items-center gap-2 hover:text-accent">Explorar outros projetos <ArrowUpRight size={12} /></Link></footer>
      </div>
    </main>
  )
}

function ScriptCard({ item }: { item: CodeExample }) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  async function copy() {
    try {
      await navigator.clipboard.writeText(item.code)
      setCopied(true)
      setError("")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Não foi possível copiar. Selecione o código abaixo ou baixe o arquivo.")
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob(["\uFEFF", item.code.replace(/\r?\n/g, "\r\n")], { type: "text/plain;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = item.filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <article className="min-w-0 border border-border/70 bg-background/90 transition-colors hover:border-accent/50">
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest"><span className="inline-flex items-center gap-2 text-accent"><Code2 size={14} /> {item.category}</span><span className="text-muted-foreground">PowerShell / .ps1</span></div>
        <h2 className="mt-6 text-2xl tracking-tight md:text-3xl">{item.title}</h2>
        <p className="mt-4 min-h-18 text-sm leading-6 text-muted-foreground">{item.description}</p>
      </div>
      <div className="flex items-center justify-between gap-2 border-y border-border/60 bg-card px-5 py-3 font-mono text-[10px]"><span className="truncate text-muted-foreground">{item.filename}</span><span className="shrink-0 text-muted-foreground">{item.behavior ?? "Somente consulta"}</span></div>
      <pre data-lenis-prevent className="h-80 overflow-auto bg-black/30 p-5 font-mono text-xs leading-6 text-foreground/85" tabIndex={0} aria-label={`Código de ${item.title}`}><code>{item.code}</code></pre>
      <div className="border-t border-border/60 p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Exemplo de execução</p>
        <code className="mt-3 block overflow-x-auto whitespace-nowrap pb-2 font-mono text-xs text-foreground/80">{item.usage}</code>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={download} className="inline-flex items-center gap-2 bg-accent px-4 py-3 font-mono text-xs text-accent-foreground transition-opacity hover:opacity-80"><ArrowDownToLine size={14} /> Baixar .ps1</button>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs transition-colors hover:border-accent">{copied ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copied ? "Copiado!" : "Copiar código"}</span></button>
        </div>
        {error && <p role="alert" className="mt-3 text-xs text-accent">{error}</p>}
      </div>
    </article>
  )
}
