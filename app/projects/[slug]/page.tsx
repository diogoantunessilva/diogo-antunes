import Link from "next/link"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const showVideo = slug === "automacao-python"

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
            Automação de dados via CLI em OLT-NOKIA
          </h1>
          <br />
          <h2 className="mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight text-muted-foreground">
            {slug.replace(/automacao-python/g, " ")}
          </h2>
          <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Este projeto é um script de automação de dados desenvolvido em Python, projetado para extrair informações de OLTs da Nokia usando a interface de linha de comando (CLI). O script se conecta à OLT, executa comandos específicos para coletar dados relevantes e os organiza em um formato estruturado, como xls. Ele é especialmente útil para profissionais de redes que precisam monitorar e gerenciar equipamentos de forma eficiente, economizando tempo e reduzindo erros manuais na coleta de dados.
            <br />
            Aqui estão os detalhes do projeto:
            <br />
            <br />
            <strong>Funcionalidades:</strong> O script é capaz de ler comandos da OLT Nokia para extrair informações como status dos clientes, nível de sinal, última queda, e salvar esses dados em um arquivo xls para fácil análise.
            <br />
            <br />
            <strong>Tecnologias Utilizadas:</strong> Python, MobaXterm, e bibliotecas para manipulação de arquivos xls (como openpyxl).
            <br />
            <br />
            <strong>Aplicações Práticas:</strong> Este script é ideal para administradores de rede e engenheiros que precisam monitorar o desempenho e a configuração de OLTs da Nokia, permitindo uma gestão mais eficiente da infraestrutura de rede.
            <br />
            <br />
            <strong>Observação:</strong> Este projeto está em desenvolvimento, e mais funcionalidades podem ser adicionadas no futuro, como suporte para múltiplas OLTs, integração com sistemas de monitoramento e alertas automáticos.
            <br />
            <br />
            <strong>Demonstrativo de saída:</strong>{" "}
            <br />
            <a
              href="/downloads/ip-do-equipamento.xlsx"
              download
              className="underline decoration-accent/60 hover:text-foreground transition-colors"
            >
              Baixar planilha de exemplo
            </a>
            <br />
            <a
              href="/downloads/parser_nokia_olt_avacado.xlsx"
              download
              className="underline decoration-accent/60 hover:text-foreground transition-colors"
            >
              Baixar script de exemplo
            </a>
          </p>

          <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Sinta-se à vontade para entrar em contato comigo para mais informações ou para discutir possíveis colaborações.
          </p>
        </div>
        
        {showVideo && (
          <aside className="lg:sticky lg:top-40">
            <div className="border border-border/40 rounded-lg overflow-hidden bg-black/40">
              <video
                src="/downloads/demonstrativo_python.mp4"
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
