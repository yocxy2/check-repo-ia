"use client"
import { useState } from "react";
import Item from "./Item";
import InputSearch from "@/components/InputSearch";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("");


  const handlerClick = async () => {
    setLoading(true)
    try{
      const [user, repo] = url.replaceAll(/(http|https):\/\/github.com\//g, "").replace("/"," ").trim().split(" ")
      const response = await fetch(`/api/repo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, repo })
      })
      const data = await response.json()
      console.log(data)
      setFiles(data)
    }catch(e){
      console.error(e)
    } finally {
      setLoading(false)
    }
  }


  return (
    <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-4xl mx-auto">
      <InputSearch value={url} onChange={e=>setUrl(e.target.value)} onSearch={handlerClick} loading={loading} />
      <section className="flex flex-row gap-4">
        <span className="text-slate-400">Path: </span>
        <span className="text-slate-600">{path}</span>
        <button onClick={() => setPath("")}>Reset</button>
      </section>
      <section className="flex flex-col gap-4">
        <table className="table-auto">
        {files.filter( (file) => file.path?.includes(path) ).map((file, index) => (
          <Item
            key={index}
            user={url.replaceAll(/(http|https):\/\/github.com\//g, "").replace("/"," ").trim().split(" ")[0]}
            repo={url.replaceAll(/(http|https):\/\/github.com\//g, "").replace("/"," ").trim().split(" ")[1]}
            file={file}
            onClick={w=>setPath(w)}
            />
        ))}
        </table>
      </section>
    </main>
  );
}
