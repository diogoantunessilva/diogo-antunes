import Link from "next/link"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isSirene = slug === "sirene-modbus"

  return (
    <main className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="mb-10">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 items-start">
        <div>
          <h1 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            {isSirene ? "Sistema de sirene via Modbus" : "Projeto em desenvolvimento"}
          </h1>
          <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            {isSirene ? (
              <>
                Projeto de automação para acionamento e monitoramento de sirene industrial via protocolo Modbus TCP
                (porta 502), com foco em confiabilidade operacional e integração com CLP.
                <br />
                <br />
                <strong>Funcionalidades:</strong> acionamento remoto, leitura de status da saída digital, confirmação
                de comando e tratamento de falhas de comunicação.
                <br />
                <br />
                <strong>Aplicação:</strong> ideal para cenários de alerta operacional e sinalização em ambiente
                industrial e perimetros de condomínios.
                <br />
                <br />
                <strong>Link do projeto:</strong>{" "}
                <a
                  href="https://sistema-modbus.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent/60 hover:text-foreground transition-colors"
                >
                  Abrir repositório/demonstração
                </a>
              </>
            ) : (
              <>Conteúdo desta rota ainda será adicionado.</>
            )}
          </p>

          <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Sinta-se à vontade para entrar em contato comigo para mais informações ou para discutir possíveis colaborações.
          </p>
        </div>

        {isSirene && (
          <aside className="lg:sticky lg:top-40">
            <div className="border border-border/40 rounded-lg overflow-hidden bg-black/40">
              <video
                src="/downloads/Demonstrativo-modbus.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-auto"
              />
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}
