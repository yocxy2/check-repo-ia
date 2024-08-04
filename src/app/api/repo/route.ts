import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest) {
    const { user, repo } = await request.json()
    console.log(user, repo)
    const files = await recursiveFetch(user, repo)
    return NextResponse.json( files.reduce( (acc, item) => acc.findIndex( ({path}:{path:string})=>path===item.path)===-1?[...acc,item]:acc ,[]) )
}

async function recursiveFetch(user:string, repo:string, path:string = "", results:fileRepo[] = []) {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`, {  })
    const data = await response.json()

    let files = data.filter( (item:fileRepo) => item?.type==='file' ).map((item:fileRepo) => ({ name:item.name, path:item.path }) )

    const folders = data.filter( (item:fileRepo) => item?.type==='dir' ).map((item:fileRepo) => item.path)

    if( folders.length === 0 ) return [...files, ...results]
    for( const folder of folders ) {
        const filesInFolders = await recursiveFetch(user, repo, folder, results) as fileRepo[]
        results.push(...filesInFolders)
    }
    return [...files, ...results]
}