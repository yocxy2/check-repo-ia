export default function Filter({ path, onReset }:{ path:string, onReset?:()=>void }) {

    return <section className="flex flex-row flex-start items-center gap-4 w-full text-lg">
        <span className="text-slate-600 w-40">Path: {path}</span>
        {onReset && <button className="text-md border border-indigo-500 text-indigo-500 py-1 px-4 rounded" onClick={onReset}>Reset</button>}
    </section>
}