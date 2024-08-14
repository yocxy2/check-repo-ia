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
import CodeEditor from "@/components/CodeEditor"

interface CheckerFileProps {
    repo?:{
        user?:string
        main?:string
        name?:string
        language?: string
        visibility?: string
    }
    files?: FileType[]
}

const defaultRepoProps = {
    user: "",
    main: "",
    name: "",
    language: "",
    visibility: ""
}

export default function CheckerFile({
    repo:{
        user,
        name,
        main
    }=defaultRepoProps,
    files
}: CheckerFileProps)  {
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
            sessionStorage.setItem(`${user}/${name}/${path}`, JSON.stringify({
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
        const oldFileStoraged = JSON.parse( sessionStorage.getItem(`${user}/${name}/${file}`) as string)
        try{
            if( !user || !name || !main ) throw new Error("No se ha podido obtener el usuario, repositorio o rama principal")
            const token = localStorage.getItem("check-repo-token")
            const { data:value, error, description } = await GithubService.getContentFile(user as string, name as string, file, main as string, token as string)
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

    const handleChangeTitle = (value:string) => {
        if( files ) return
        setContent( (prev:any) => ({
            ...prev,
            value
        }))
        setPath(value.slice(0, 40))
    }


    return <section className="z-20 w-full grid grid-cols-12 gap-0 shadow-lg shadow-slate-800 border border-black rounded-lg overflow-hidden divide-x divide-black">
        {files &&<nav className="col-span-3 bg-slate-200">
            <NavigationDirectory files={files} onSelect={handlerSelectFile} path={path}/>
        </nav>}
        <CodeEditor
            className={ (files ? "col-span-9 max-w-4xl" : "col-span-12 ") + " bg-white w-full min-h-96 flex flex-col"}
            title={path}
            value={content?.value}
            description={content?.description}
            loading={loading}
            checking={isLoading}
            rate={content?.rate}
            fixes={content?.fixes}
            onChange={handleChangeTitle}
            onCheck={handlerCheckFile}
        />
        <ReactCanvasConfetti
            onInit={ ({ confetti }:{ confetti:TCanvasConfettiInstance }) => instanceConfetti.current = confetti }
        />
        <ToastMessage />
    </section>
}