"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page({ searchParams }:{ searchParams: { code: string } }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()
    const { code } = searchParams
    useEffect(() => {
        (async () => {
            if( !code ) return
            const response = await fetch("/api/github/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            })
            const { error, description, data } = await response.json()
            if( error ) setError(description)
            else {
                localStorage.setItem("check-repo-time", Date.now().toString())
                localStorage.setItem("check-repo-token", data.access_token)
                router.push("/")
            }
            setLoading(false)
        })()
    },[code, router])

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-center p-2 max-w-4xl mx-auto">
        <span className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20 text-indigo-500 flex justify-center">
            { loading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg> }
            { error && <p className="w-full text-center italic py-2 text-red-500">{error}</p> }

        </span>
    </main>
}