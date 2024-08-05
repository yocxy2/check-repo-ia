"use client"
import { useState } from "react";
import Item from "../Item";
import InputSearch from "@/components/InputSearch";
import Filter from "@/components/Filter";
import TableFiles from "@/components/TableFiles";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<FileType[]>([]);
  const [path, setPath] = useState("");


  const handlerClick = async () => {
    setLoading(true)
    try{
      const [user, repo] = getFromUrl()
      const response = await fetch(`/api/repo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, repo })
      })
      const data = await response.json() as FileType[]
      console.log(data)
      setFiles(data)
    }catch(e){
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getFromUrl = () => url.replaceAll(/(http|https):\/\/github.com\//g, "").replace("/"," ").trim().split(" ")

  const handlerFilterFiles = (file:FileType) => {
    return file?.path?.includes(path)
  }

  const handlerChecked = (index:number, object:any) => {
    console.log(index, object)
    setFiles( prev => prev.map((file:FileType) => {
      if( file.index === index ) {
        return {
          ...file,
          numberFixes: object.fixes.length,
          rate: object.rate
        }
      }
      return file
    }))
  }

  return (
    <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-4xl mx-auto">
      <InputSearch value={url} onChange={e=>setUrl(e.target.value)} onSearch={handlerClick} loading={loading} />
      <Filter path={path} onReset={()=>setPath("")} />
      <section className="flex flex-col gap-4 w-full">
        <TableFiles>
          {files.filter(handlerFilterFiles).map((file:FileType, index:number) => (
            <Item
              key={index}
              user={getFromUrl()[0]}
              repo={getFromUrl()[1]}
              file={file}
              onChecked={handlerChecked}
              onClick={(selectedPath:string)=>setPath(selectedPath)}
              />
          ))}
        </TableFiles>
      </section>
    </main>
  );
}
