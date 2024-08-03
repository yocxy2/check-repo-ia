"use client"

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("");

  const handlerClick = async () => {
    const [user, repo] = url.replaceAll(/(http|https):\/\/github.com\//g, "").replace("/"," ").trim().split(" ")
    const response = await fetch(`/api/repo/${user}/${repo}`, {  })
    const data = await response.json()
    console.log(data.files)
    setFiles(data.files)
  }

  const selectPath = (file, word) => () => {
    if( word !== file.path.split("/").pop() ) {
      setPath(word)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <form className="flex flex-col gap-0">
        <span className="border border-indigo-600 bg-white rounded overflow-hidden py-1 px-2">
          <input type="text" className="border-none outline-none" value={url} onChange={ev => setUrl(ev.target.value)} />
          <button type="button" onClick={handlerClick}>Send</button>
        </span>
        <small>E</small>
      </form>
      <section className="flex flex-row gap-4">
        <span className="text-slate-400">Path: </span>
        <span className="text-slate-600">{path}</span>
        <button onClick={() => setPath("")}>Reset</button>
      </section>
      <section className="flex flex-col gap-4">
        <table className="table-auto">
        {files.filter( (file) => file.path?.includes(path) ).map((file, index) => (
          <tr key={index}>
            <td className="px-4 py-1 flex flex-row gap-0 text-slate-400">{file.path.split("/").map( word => <>
              <span>/</span>
              <button onClick={selectPath(file, word)} className="hover:text-slate-800 last:hover:text-slate-600 last:text-slate-600">{word}</button>
            </> )}</td>
            <td className="px-4 py-1">{ file?.details?.description }</td>
            <td className="px-4 py-1">{ file?.details?.check ? "Si" : "No" }</td>
          </tr>
        ))}
        </table>
      </section>
    </main>
  );
}
