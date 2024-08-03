import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(request:NextRequest, { params }:{ params:{ user:string, repo:string }}) {
    const { user, repo } = params
    const files = await recursiveFetch(user, repo)
    return NextResponse.json({ files: files.reduce( (acc, item) => acc.findIndex( ({path}:{path:string})=>path===item.path)===-1?[...acc,item]:acc ,[]) })
}

async function recursiveFetch(user:string, repo:string, path:string = "", results:fileRepo[] = []) {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`, {  })
    const data = await response.json()

    let files = data.filter( (item:fileRepo) => item?.type==='file' ).map((item:fileRepo) => ({ name:item.name, path:item.path }) )

    for( const index in files ) {

        files[index].details = await getDetails(user, repo, files[index].path)
    }

    const folders = data.filter( (item:fileRepo) => item?.type==='dir' ).map((item:fileRepo) => item.path)

    if( folders.length === 0 ) return [...files, ...results]
    for( const folder of folders ) {
        const filesInFolders = await recursiveFetch(user, repo, folder, results) as fileRepo[]
        results.push(...filesInFolders)
    }
    return [...files, ...results]
}


const getDetails = async (user:string, repo:string, path:string) => {
    if( !/(tsx|jsx)/.exec(path) ) return { description: "Not React Component", check: true }
    const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/${path}`, {  })
    const data = await response.text()

    return {
        description: data.length > 200 ? `File very large ${data.length}` : "Good",
        check: data.length <= 200
    }
}