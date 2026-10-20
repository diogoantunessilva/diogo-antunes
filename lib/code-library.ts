import { windowsMonitorCode } from "./windows-monitor-code"

export type CodeExample = {
  id: string
  title: string
  description: string
  category: string
  filename: string
  usage: string
  code: string
  behavior?: string
}

// Para publicar outro arquivo, adicione um item seguindo este mesmo formato.
export const codeLibrary: CodeExample[] = [
  {
    id: "verificar-conectividade",
    title: "Verificar conectividade de IPs",
    description: "Teste uma lista de endereços com duas tentativas de ping por IP. UP indica resposta; DOWN indica ausência de resposta ao ping, sem confirmar que o equipamento esteja desligado. Edite a lista $ips para consultar seus equipamentos.",
    category: "Redes",
    filename: "verificar-conectividade.ps1",
    usage: '.\\verificar-conectividade.ps1',
    code: `$ips = "172.215.3.4","172.215.3.10"

$ips | ForEach-Object {
    if (Test-Connection $_ -Count 2 -Quiet) {
        "{0,-15} [UP]" -f $_
    }
    else {
        "{0,-15} [DOWN]" -f $_
    }
}
`,
  },
  {
    id: "diagnostico-rede",
    title: "Diagnóstico de rede",
    description: "Mapeie a rede CFTV 172.215.1.0/24, consulte ping, MAC e hostname e exporte um relatório CSV para a Área de Trabalho. Ausência de resposta não garante que o IP esteja livre; a consulta de MAC depende da rede local.",
    category: "Redes",
    filename: "diagnostico-rede.ps1",
    usage: '.\\diagnostico-rede.ps1',
    code: String.raw`# Ajuste o prefixo abaixo para a rede que deseja consultar.
$rede = "172.215.1"
$resultados = @()

Write-Host "Iniciando varredura da rede $rede.0/24..." -ForegroundColor Cyan

1..254 | ForEach-Object {
    $ip = "$rede.$_"

    Write-Progress -Activity "Mapeando rede CFTV" -Status "Verificando $ip" -PercentComplete (($_ / 254) * 100)

    $ping = Test-Connection -ComputerName $ip -Count 1 -Quiet -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 30

    $vizinho = Get-NetNeighbor -IPAddress $ip -ErrorAction SilentlyContinue |
        Where-Object {
            $_.LinkLayerAddress -and
            $_.LinkLayerAddress -ne "00-00-00-00-00-00"
        } |
        Select-Object -First 1

    $mac = if ($vizinho) { $vizinho.LinkLayerAddress } else { "" }

    try {
        $hostname = [System.Net.Dns]::GetHostEntry($ip).HostName
    }
    catch {
        $hostname = ""
    }

    # Ausência de resposta não confirma que o endereço esteja disponível.
    $status = if ($ping -or $mac) { "OCUPADO" } else { "SEM RESPOSTA" }

    $resultados += [PSCustomObject]@{
        IP       = $ip
        MAC      = $mac
        Ping     = $ping
        Hostname = $hostname
        Status   = $status
    }
}

Write-Progress -Activity "Mapeando rede CFTV" -Completed

$caminho = Join-Path ([Environment]::GetFolderPath("Desktop")) "Mapeamento_CFTV.csv"

$resultados | Export-Csv -Path $caminho -NoTypeInformation -Encoding UTF8 -Delimiter ";"

Write-Host ""
Write-Host "Varredura concluída." -ForegroundColor Green
Write-Host "Arquivo salvo em:"
Write-Host $caminho -ForegroundColor Yellow

$ocupados = @($resultados | Where-Object Status -eq "OCUPADO").Count
$semResposta = @($resultados | Where-Object Status -eq "SEM RESPOSTA").Count

Write-Host ""
Write-Host "===== RESUMO =====" -ForegroundColor Cyan
Write-Host "IPs ocupados: $ocupados"
Write-Host "IPs sem resposta: $semResposta"
`,
  },
  {
    id: "consultar-servicos",
    behavior: "Gera relatórios CSV",
    title: "Consultar serviços do Windows",
    description: "Monitor de desempenho Windows v2.0: identifica o hardware e permite escolher um processo ou serviço para acompanhar CPU, RAM e GPU. Coleta a cada 15 segundos e salva médias e picos em CSV a cada 10 minutos em C:\\Temp\\Monitoramento. Interrompa com Ctrl + C; o período em andamento pode não ser salvo.",
    category: "Sistema",
    filename: "consultar-servicos.ps1",
    usage: '.\\consultar-servicos.ps1',
    code: windowsMonitorCode,
  },
]
