import Link from "next/link"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isSirene = slug === "sirene-modbus"
  const isArtigo = slug === "projeto-artigo"
  const isPython = slug === "automacao-python"

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
            {isSirene
              ? "Sistema de sirene via Modbus"
              : isArtigo
                ? "Desenvolvimento de artigo para revista"
                : isPython
                  ? "Automação de dados via CLI em OLT-NOKIA"
                : "Projeto em desenvolvimento"}
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
            ) : isArtigo ? (
              <>
                Projeto acadêmico com foco em phishing, pesquisa aplicada e conscientização em segurança da
                informação.
                <br />
                <br />
                <strong>Dados:</strong> pesquisa de campo sobre ataques mais comuns, técnicas usadas e nível de
                conscientização dos usuários.
                <br />
                <br />
                <strong>Aplicação:</strong> desenvolvimento de site para apresentar tendências e práticas de prevenção.
                <br />
                <br />
                <strong>Link do projeto:</strong>{" "}
                <a
                  href="https://atividade-phishing-fatec.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent/60 hover:text-foreground transition-colors"
                >
                  Abrir demonstração
                </a>
              </>
            ) : isPython ? (
              <>
                Este projeto é um script de automação de dados desenvolvido em Python, projetado para extrair
                informações de OLTs da Nokia usando interface de linha de comando (CLI).
                <br />
                <br />
                <strong>Funcionalidades:</strong> leitura de comandos da OLT Nokia para extrair status dos clientes,
                nível de sinal e última queda, com exportação para arquivo Excel.
                <br />
                <br />
                <strong>Tecnologias Utilizadas:</strong> Python, MobaXterm e openpyxl.
                <br />
                <br />
                <strong>Demonstrativo de saída:</strong>{" "}
                <a
                  href="/downloads/ip-do-equipamento.xlsx"
                  download
                  className="underline decoration-accent/60 hover:text-foreground transition-colors"
                >
                  Baixar planilha de exemplo
                </a>
                <br />
                <br />
                <strong>Plataforma:</strong>{" "}
                <a
                  href="https://alaresb2b.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-accent/60 hover:text-foreground transition-colors"
                >
                  Acessar plataforma
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

        {(isSirene || isPython) && (
          <aside className="lg:sticky lg:top-40">
            <div className="border border-border/40 rounded-lg overflow-hidden bg-black/40">
              <video
                src={isPython ? "/downloads/demonstrativo_python.mp4" : "/downloads/Demonstrativo-modbus.mp4"}
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
