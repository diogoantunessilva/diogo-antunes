import type { Metadata } from "next"
import { CodeLibrary } from "@/components/code-library"

export const metadata: Metadata = {
  title: "Biblioteca PowerShell | Diogo Antunes",
  description: "Scripts PowerShell para redes e sistemas Windows. Consulte, copie e baixe os códigos da biblioteca.",
}

export default function PowerShellLibraryPage() {
  return <CodeLibrary />
}
