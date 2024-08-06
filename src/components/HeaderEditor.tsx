import { NOT_RATE, CODE, ISSUES } from "@/tools/constants"
import RateLabel from "./RateLabel"

interface HeaderEditorProps {
    title: string,
    rate: number,
    fixesCount: number,
    loading: boolean,
    currentTab: string,
    onCheck: ()=>void,
    onChange: (tab:string)=>void
}

export default function HeaderEditor({ title, rate, fixesCount, loading, currentTab, onCheck, onChange  }:HeaderEditorProps) {

    const labelCheck = () => loading ? "Checking..." : (rate!==NOT_RATE ? "Re-Check" : "Check")

    return <div className="border-b border-black border-opacity-50 py-2 px-4 font-bold text-lg flex flex-row justify-between items-center">
        <label className="flex gap-5 items-center">{title}  { rate!==NOT_RATE && <RateLabel rate={rate}/> }</label>
        <div className="flex flex-row gap-1 items-center">
            <button className="border border-black py-1 px-4 rounded-md text-sm font-normal" onClick={onCheck}>
                { labelCheck() }
            </button>
            { rate!==NOT_RATE && <nav className="text-sm font-normal flex flex-row p-0  border border-black rounded-lg overflow-hidden divide-x divide-black" >
                <button className={currentTab===CODE ? "bg-slate-300 font-semibold py-1 px-2" : "py-1 px-2"} onClick={()=>onChange(CODE)}>Code</button>
                <button className={currentTab===ISSUES ? "bg-slate-300 font-semibold py-1 px-2" : "py-1 px-2"} onClick={()=>onChange(ISSUES)}>Issues ({ fixesCount })</button>
            </nav>}
        </div>
    </div>
}