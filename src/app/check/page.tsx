import CheckerFile from "@/sections/CheckerFile"
import Link from "next/link"

export default async function Page() {

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-7xl mx-auto">
        <section className="bg-white rounded-lg text-left w-full text-lg z-20 shadow shadow-slate-800 p-4 flex flex-row justify-between">
            <div className="gap-3 flex flex-col">
                <h2 className="text-2xl font-bold">¿Cuan bien has hecho tu trabajo?</h2>
                <p>Escribe el código que deseas revisar y presiona el botón <span className="font-bold text-indigo-600">Check</span></p>
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
        <CheckerFile />
    </main>
}