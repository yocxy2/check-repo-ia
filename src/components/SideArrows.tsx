export default function SideArrows({ onNext, onBack }:{ onNext:(value:1|-1)=>void, onBack:(value:1|-1)=>void }) {

    return <>
        <button className="rounded-full bg-indigo-400 hover:bg-indigo-600 text-white p-1" onClick={()=>onBack(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <button className="rounded-full bg-indigo-400 hover:bg-indigo-600 text-white p-1" onClick={()=>onNext(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    </>
}