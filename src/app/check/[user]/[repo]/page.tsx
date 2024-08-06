import CheckerFile from "@/sections/CheckerFile"
import { recursiveFetch } from "@/tools/common"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page({ params }:{ params: { user: string, repo: string } }) {
    const { user, repo } = params

    const response = await fetch(`https://api.github.com/repos/${user}/${repo}`)
    if( response.status !== 200 ) redirect("/?error=PRIVATE_REPO")
    const { default_branch } = await response.json()

    const result = await recursiveFetch(user, repo)

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-7xl mx-auto">
        <section className="bg-white rounded-lg text-left w-full text-lg z-20 shadow shadow-slate-800 p-4 flex flex-row justify-between">
            <div className="gap-3 flex flex-col">
                <h2 className="text-2xl font-bold">¿Cuan bien has hecho tu trabajo?</h2>
                <p>Selecciona el archivo que deseas revisar y presion el boton <span className="font-bold text-indigo-600">Check</span></p>
                <div className="flex flex-row gap-2">
                    <span className="font-bold">Repositorio:</span>
                    <Link href={`https://github.com/${user}/${repo}`} target="_blank" className="bg-yellow-200 hover:text-yellow-600 px-4 rounded-2xl">https://github.com/{user}/{repo}</Link>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Link href="/" className="text-indigo-600 flex flex-col items-center border border-indigo-600 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <span className="font-bold ">Volver</span>
                </Link>
            </div>
        </section>
        <CheckerFile files={result} main={default_branch} user={user} repo={repo} />
    </main>
}