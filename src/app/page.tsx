"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import InputSearch from "@/components/InputSearch"

export default function Page() {
    const router = useRouter()
    const [error, setError] = useState("")
    const [url, setUrl] = useState("")

    const getFromUrl = () => url.replaceAll(/(http|https):\/\/github.com\//g, "").replaceAll(/\?.{1,}/g,"").replaceAll("/"," ").trim().split(" ")

    const handlerClick = async () => {
        const [user, repo] = getFromUrl()
        if( !user || !repo ) {
            setError("URL inválida")
            setTimeout(()=>setError(""), 3000)
            return
        }
        router.push(`/check/${user}/${repo}`)
      }

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-4xl mx-auto">
        <InputSearch value={url} onChange={e=>setUrl(e.target.value)} onSearch={handlerClick} />
        {error && <p className="w-full text-center italic py-2 text-red-500">{error}</p>}
    </main>
}