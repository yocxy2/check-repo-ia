"use client"
import { useRef, useState } from "react"
import { Editor } from "@monaco-editor/react"
import { experimental_useObject as useObject } from "ai/react"
import { parse } from "marked"
import ReactCanvasConfetti from "react-canvas-confetti"
import { checkSchema } from "@/app/api/file-check/schema"
import HeaderEditor from "@/components/HeaderEditor"
import NavigationDirectory from "@/components/NavigationDirectory"
import { CODE, NOT_RATE, ISSUES, ROUTE } from "@/tools/constants"
import { TCanvasConfettiInstance } from "react-canvas-confetti/dist/types"
import GithubService from "@/tools/GithubService"
import { toast } from "react-toastify"
import ToastMessage from "@/components/ToastMessage"

interface CheckerFileProps {
    user:string
    main:string
    repo:string
    files: FileType[]
    language: string
    visibility: string
}


export default function CheckerFile({ user, main, repo, files }: CheckerFileProps)  {
    const { submit, isLoading, stop } = useObject({
        api: ROUTE.CHECK_FILE,
        schema: checkSchema,
        onFinish: ({ object:responseObject, error }) => {
            if( error ) return
            if( !responseObject ) return
            setContent( (prev:any) => ({
                ...prev,
                description: responseObject.description as string,
                fixes: responseObject.fixes as string[],
                rate: responseObject.rate as number
            }))
            if( instanceConfetti?.current && responseObject?.rate && responseObject.rate>80){
                instanceConfetti?.current({
                    particleCount: 200,
                    spread: 70,
                    origin: { y: 0.8 },
                })
            }
            sessionStorage.setItem(`${user}/${repo}/${path}`, JSON.stringify({
                description: responseObject.description as string,
                fixes: responseObject.fixes as string[],
                rate: responseObject.rate as number
            }))
        },
        onError: (error) => {
            console.error(error)
            toast.error(error.message)
            stop()
        }
    })
    const [tab, setTab] = useState(CODE)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState<ContentType>({
        value: "",
        description: "",
        fixes: [],
        rate: NOT_RATE
    })
    const [path, setPath] = useState("")
    const instanceConfetti = useRef<TCanvasConfettiInstance>()

    const handlerSelectFile = async (file:string) => {
        setLoading(true)
        setTab(CODE)
        setPath(file)
        const oldFileStoraged = JSON.parse( sessionStorage.getItem(`${user}/${repo}/${file}`) as string)
        try{
            const token = localStorage.getItem("check-repo-token")
            const { data:value, error, description } = await GithubService.getContentFile(user, repo, file, main, token as string)
            if( error ) throw new Error(description)
            setContent( {
                value,
                description: oldFileStoraged ? oldFileStoraged?.description : "",
                fixes: oldFileStoraged ? oldFileStoraged?.fixes : [],
                rate: oldFileStoraged ? oldFileStoraged?.rate : NOT_RATE
            })
        }catch(e:any){
            console.error(e)
            toast.error(e.message)
            setTab(tab)
            setPath(path)
        }
        finally{
            setLoading(false)
        }
    }

    const handlerCheckFile = async () => {
        submit({ file: path, content: content.value })
    }

    const getMarked = (text:string) => {
        return parse(text, {  gfm:true, breaks:true  } ) as string
    }


    return <section className="z-20 w-full grid grid-cols-12 gap-0 shadow-lg shadow-slate-800 border border-black rounded-lg overflow-hidden divide-x divide-black">
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
            { tab===ISSUES && <div id="preview-markup" className="p-4" dangerouslySetInnerHTML={{ __html: getMarked( `### Descripcion \n${content?.description} \n\n### Posibles Mejoras \n${content?.fixes?.join('\n')} ` ) }} />}
            <ReactCanvasConfetti
                onInit={ ({ confetti }:{ confetti:TCanvasConfettiInstance }) => instanceConfetti.current = confetti }
            />
        </div>
        <ToastMessage />
    </section>
}