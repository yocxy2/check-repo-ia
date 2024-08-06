import { experimental_useObject as useObject } from "ai/react"
import { checkSchema } from "./api/file-check/schema";
import { useEffect, useState } from "react";
import { checktFileType } from "@/tools/common";

export default function Item({ file , repo, user, onClick, onChecked }:{ file: any, repo:string, user:string, onClick:any, onChecked:any }) {
    const [checked, setChecked] = useState(false)
    const { object, submit, isLoading } = useObject({
        api:'/api/file-check',
        schema: checkSchema
      })

      useEffect(()=>{
        let id:NodeJS.Timeout
        if( checktFileType(file.path) && !checked ) {
            id = setTimeout(()=>{
                submit({ file: file.path, user, repo })
            }, file.index * 1000)
        }
        return () => clearTimeout(id)
      },[submit, file, checked, user, repo])

      useEffect(()=>{
        if( object && !checked ) {
            onChecked && onChecked(file.index, object)
            setChecked(true)
        }
      },[object, file, onChecked, checked])



    const selectPath = (file:FileType, word:string) => () => {
        if( word !== file.path.split("/").pop() ) {
            onClick && onClick(word)
        }
    }

    const handlerClick = async (path:string) => {
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/${path}`)
        const content = await response.text()
        submit({ file: path, value: content })
    }

    return <tr>
        <td className="px-4 py-1 flex flex-row gap-0 text-slate-400 text-nowrap">
            {file.path.split("/").map( (word:string) => <>
                <span>/</span>
                <button onClick={selectPath(file, word)} className="hover:text-slate-800 last:hover:text-slate-600 last:text-slate-600">{word}</button>
                </>
            )}
            {isLoading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-indigo-600 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>}
        </td>
        <td className="px-4 py-1">
            {file.numberFixes}
        </td>
        <td className="px-4 py-1 w-full text-center">{ file.rate }</td>
    </tr>
}