"use client"
import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import InputSearch from "@/components/InputSearch"
import Slider from "@/components/Slider"
import { ERROR } from "@/tools/constants"
import ButtonGithub from "@/components/ButtonGithub"
import { generateGithubUrl, getFromUrl } from "@/tools/common"
import { setToken } from "@/tools/action"

export default function Page() {
    const router = useRouter()
    const paramNames = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [url, setUrl] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        if( window ){
            setToken( window.localStorage.getItem("check-repo-token") as string )
        }
    },[])

    useEffect(() => {
        const errorKey = paramNames.get("error") as string
        switch (errorKey) {
            case ERROR.NOT_PUBLIC:
                setError(ERROR.NOT_PUBLIC_DESC)
                break;
            case ERROR.INVALID_URL:
                setError(ERROR.INVALID_URL_DESC)
                break;
            case ERROR.RATE_LIMIT:
                setError(ERROR.RATE_LIMIT_DESC)
                break;
            case ERROR.NOT_FOUND:
                setError(ERROR.NOT_FOUND_DESC)
                break;
            default:
                setError("")
                break;
        }
    },[paramNames])

    const handlerSearch = async () => {
        setLoading(true)
        const [user, repo] = getFromUrl(url)
        if( !user || !repo ) {
            setError("URL inválida")
            setTimeout(()=>setError(""), 3000)
            setLoading(false)
            return
        }
        await setToken(localStorage.getItem("check-repo-token") as string)
        router.push(`/check/${user}/${repo}`)
      }

    return <Suspense>
        <main className="flex gap-8 min-h-screen flex-col items-center justify-center p-2 max-w-4xl mx-auto">
            <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20">
                <Slider />
            </div>
            <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white py-20 px-10 w-2/3 z-20">
                <InputSearch value={url} onChange={e=>setUrl(e.target.value)} onSearch={handlerSearch} loading={loading}/>
                {error && <p className="w-full text-center italic py-2 text-red-500">{error}</p>}
            </div>
            <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20">
                <p className="text-left">Accede con tu cuenta de github para mejores caracteristicas</p>
                { !token && <span className="flex w-fit mx-auto mt-2">
                    <ButtonGithub label="Acceder con Github" href={generateGithubUrl()}/>
                </span>}
            </div>
        </main>
    </Suspense>
}
