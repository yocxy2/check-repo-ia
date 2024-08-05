import { InputHTMLAttributes } from "react"

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: () => void
    loading?: boolean
}

export default function InputSearch({ onSearch, loading, ...rest}: InputSearchProps) {

    return <form className="flex flex-col gap-0 w-full">
        <span className="text-slate-600 border border-indigo-600 bg-white rounded overflow-hidden py-1 px-2 flex flex-row gap-1 justify-between">
            <input type="text" className="w-full border-none outline-none" placeholder="https://github.com/user/repo" {...rest} />
            {!loading && <button type="button" onClick={onSearch} className="text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>}
            {loading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-indigo-600 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>}
        </span>
        <small>Ingresa la url del repositorio. Debe ser un repositorio publico</small>
    </form>
}