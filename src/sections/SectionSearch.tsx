"use client"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { getFromUrl } from "@/tools/common"
import { setToken } from "@/tools/action"

import InputSearch from "@/components/InputSearch"
import Link from "next/link"

export default function SectionSearch({ errorDefault }: { errorDefault:string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(errorDefault ?? "")
    const [url, setUrl] = useState("")

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
        <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20 hover:shadow-indigo-300">
            <InputSearch value={url} onChange={e=>setUrl(e.target.value)} onSearch={handlerSearch} loading={loading}/>
            {error && <p className="w-full text-center italic py-2 text-red-500">{error}</p>}
            <div className="w-full flex justify-center py-4 items-center">
                <Link href="/check" className="py-1 px-2 w-fit flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">Revisar archivo único</Link>
            </div>
        </div>
    </Suspense>
}