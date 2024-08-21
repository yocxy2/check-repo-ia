"use client"
import { useState } from "react"
import { parse } from "marked"
import HeaderEditor from "./HeaderEditor"
import { Editor } from "@monaco-editor/react"

import { CODE, ISSUES } from "../tools/constants"

interface CodeEditorProps {
    className?: string
    title: string
    value: string
    description?: string
    loading: boolean
    checking: boolean
    rate: number
    fixes: string[]
    onChange?: (value:string)=>void
    onCheck?: ()=>void
}

export default function CodeEditor({ className, title, value, description, loading, checking, rate, fixes, onChange, onCheck }:CodeEditorProps) {
    const [tab, setTab] = useState(CODE)

    const getMarked = (text:string) => {
        return parse(text, {  gfm:true, breaks:true  } ) as string
    }

    return <div className={className}>
        <HeaderEditor
            title={title}
            rate={rate}
            fixesCount={fixes.length}
            loading={checking}
            currentTab={tab}
            onCheck={onCheck}
            onChange={setTab}
            />

        { tab===CODE && <Editor defaultLanguage="typescript" defaultValue="" loading={loading} value={value} onChange={()=>onChange && onChange(value as string)}/> }
        { tab===ISSUES && <div id="preview-markup" className="p-4" dangerouslySetInnerHTML={{ __html: getMarked( `### Descripcion \n${description} \n\n### Posibles Mejoras \n${fixes?.join('\n')} ` ) }} />}
    </div>
}