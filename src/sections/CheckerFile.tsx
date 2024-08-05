"use client"
import { useEffect, useState } from "react"
import { Editor } from "@monaco-editor/react"
import { experimental_useObject as useObject } from "ai/react"
import { checkSchema } from "@/app/api/file-check/schema"
import { CODE, NOT_RATE, ISSUES } from "@/tools/constants"
import HeaderEditor from "@/components/HeaderEditor"
import NavigationDirectory from "@/components/NavigationDirectory"


export default function CheckerFile({ user, repo, files }: { user:string, repo:string, files: FileType[] }) {
    const { submit, object, isLoading } = useObject({
        api: "/api/file-check",
        schema: checkSchema
    })
    const [tab, setTab] = useState(CODE)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState<ContentType>({
        value: "",
        fixes: [],
        rate: NOT_RATE
    })
    const [path, setPath] = useState("")


    useEffect(()=>{
        if ( object ) {
            setContent( (prev:any) => ({
                ...prev,
                fixes: object.fixes as string[],
                rate: object.rate as number
            }))
            sessionStorage.setItem(`${user}/${repo}/${path}`, JSON.stringify({
                fixes: object.fixes as string[],
                rate: object.rate as number
            }))
        }
    },[object, user, repo, path])


    const handlerSelectFile = async (file:string) => {
        setLoading(true)
        setTab(CODE)
        setPath(file)
        const oldFileStoraged = JSON.parse( sessionStorage.getItem(`${user}/${repo}/${file}`) as string)
        try{
            const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/${file}`)
            const value = await response.text()
            setContent( {
                value,
                fixes: oldFileStoraged ? oldFileStoraged?.fixes : [],
                rate: oldFileStoraged ? oldFileStoraged?.rate : NOT_RATE
            })
            sessionStorage.setItem(`${user}/${repo}/${file}`, JSON.stringify({
                fixes: oldFileStoraged ? oldFileStoraged?.fixes : [],
                rate: oldFileStoraged ? oldFileStoraged?.rate : NOT_RATE
            }))
        }catch(e){
            console.error(e)
        }
        finally{
            setLoading(false)
        }
    }

    const handlerCheckFile = async () => {
        submit({ file: path, content: content.value })
    }


    return <section className="w-full grid grid-cols-12 gap-0 shadow-lg shadow-slate-800 border border-black rounded-lg overflow-hidden divide-x divide-black">
        <nav className="col-span-3 bg-slate-200">
            <NavigationDirectory files={files} onSelect={handlerSelectFile} path={path}/>
        </nav>
        <div className="col-span-9 bg-white max-w-4xl w-full flex flex-col">
            <HeaderEditor
                title={path}
                rate={content.rate}
                fixesCount={content.fixes.length}
                loading={isLoading}
                currentTab={tab}
                onCheck={handlerCheckFile}
                onChange={setTab}
             />

            { tab===CODE && <Editor
                defaultLanguage="typescript"
                defaultValue=""
                loading={loading}
                value={content.value}/>}
            { tab===ISSUES && <Editor
                defaultLanguage="html"
                defaultValue=""
                value={ content?.fixes?.join('\n') }/>}

        </div>
    </section>
}