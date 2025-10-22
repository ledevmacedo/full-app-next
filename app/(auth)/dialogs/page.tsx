"use client"

import { useAppDispatch } from "@/store/hooks";
import {
    openSuccess,
    openError,
    openWarning,
    openLoading,
    openAlert,
    closeAlert,
} from "@/store/slices/alertSlice";
import { Button } from "@/components/ui/button"
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "@/components/ui/code-block"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function DialogsPage() {
    const dispatch = useAppDispatch();

    function CopyableCode({ code, language = "tsx", theme = "github-dark", label = "TSX" }: { code: string; language?: string; theme?: string; label?: string }) {
        const [copied, setCopied] = useState(false)

        const handleCopy = () => {
            navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        }

        return (
            <CodeBlock>
                <CodeBlockGroup className="border-border border-b px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                            {label}
                        </div>
                        <span className="text-muted-foreground text-sm">
                            {theme === "github-dark" ? "GitHub Dark Theme" : "GitHub Light Theme"}
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </CodeBlockGroup>
                <CodeBlockCode code={code} language={language} theme={theme} />
            </CodeBlock>
        )
    }

    return (
        <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-bold">Testar Dialogs</h1>
            <ModeToggle />
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        onClick={() =>
                            dispatch(
                                openAlert({ variant: "default", title: "Padrão", loaded: true })
                            )
                        }
                    >
                        Abrir Default
                    </Button>
                    <CopyableCode
                        code={`dispatch(openAlert({
  variant: "default",
  title: "Padrão",
}))`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        onClick={() =>
                            dispatch(
                                openSuccess({ title: "Item updated successfully.", sub: "Your menu has been refreshed with the last changes do this item." })
                            )
                        }
                    >
                        Abrir Success
                    </Button>
                    <CopyableCode
                        code={`dispatch(openSuccess({
  title: "Sucesso!",
  sub: "Operação concluída.",
}))`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        onClick={() =>
                            dispatch(openError({ title: "Erro!", sub: "Algo deu errado." }))
                        }
                    >
                        Abrir Error
                    </Button>
                    <CopyableCode
                        code={`dispatch(openError({
  title: "Erro!",
  sub: "Algo deu errado.",
}))`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        onClick={() =>
                            dispatch(
                                openWarning({ title: "Atenção!", sub: "Verifique os dados." })
                            )
                        }
                    >
                        Abrir Warning
                    </Button>
                    <CopyableCode
                        code={`dispatch(openWarning({
  title: "Atenção!",
  sub: "Verifique os dados.",
}))`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        variant="default"
                        onClick={() =>
                            dispatch(
                                openLoading({ title: "Carregando...", sub: "Aguarde." })
                            )
                        }
                    >
                        Abrir Loading
                    </Button>
                    <CopyableCode
                        code={`dispatch(openLoading({
  title: "Carregando...",
  sub: "Aguarde.",
}))`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant="default" onClick={() => dispatch(closeAlert())}>
                        Fechar
                    </Button>
                    <CopyableCode code={`dispatch(closeAlert())`} />
                </div>
            </div>


        </div>
    )
}


