import { experimental_useObject as useObject } from "ai/react"
import { checkSchema } from "./api/file-check/schema";
import { useEffect } from "react";

export default function Item({ file , repo, user, onClick }:{ file: any, repo:string, user:string, onClick:any }) {

    const { object, submit, isLoading } = useObject({
        api:'/api/file-check',
        schema: checkSchema
      })

      useEffect(()=>{
        console.log(object)
      },[object])



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
            )}</td>
        <td className="px-4 py-1">
            { object ? <span className="w-full text-center">{object?.fixes?.length}</span>:
                <button onClick={()=>handlerClick(file.path)} className="text-sm text-slate-500 border border-slate-500 rounded px-2 py-0">
                    {isLoading ? 'Cargando...' : 'Analizar'}
                </button> }
        </td>
        <td className="px-4 py-1 w-full text-center">{object ? object.rate : '?' }</td>
    </tr>
}