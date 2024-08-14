const extensions = [ ".ts", ".tsx", ".jsx", ".js" ]
const exclude = [ ".d.ts" ]

export const checktFileType = (fileName:string) => {
    let isFile = false
    for( const ext of extensions ) {
        isFile = isFile || fileName.toLowerCase().endsWith(ext)
    }
    for( const ext of exclude ) {
        isFile = isFile && !fileName.toLowerCase().endsWith(ext)
    }
    return isFile
}


export const recursiveFetch = async (
    {user, repo, token }:{user:string, repo:string, token?:string},
    path:string = "",
    results:fileRepo[] = []
) => {
    const headers = new Headers()
    headers.set("Accept", "application/vnd.github+json")
    headers.set("X-GitHub-Api-Version","2022-11-28")
    if( token ) headers.set("Authorization", `Bearer ${token}`)
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`, {
        headers
    })
    const data = await response.json()

    let files = data.filter( (item:fileRepo) => item?.type==='file' ).map((item:fileRepo, index:number) => ({ name:item.name, path:item.path, numberFixes: 0, rate:0, deep: item.name.split("/").length - 1 }) )

    const folders = data.filter( (item:fileRepo) => item?.type==='dir' ).map((item:fileRepo) => item.path)

    if( folders.length === 0 ) return [...files, ...results]
    for( const folder of folders ) {
        const filesInFolders = await recursiveFetch({user, repo, token}, folder, results) as fileRepo[]
        results.push(...filesInFolders)
    }
    return [...files, ...results].reduce( reducerMethod ,[]).map( (item:any, index:number)=> ({...item, index}) )
}

function reducerMethod(acc:FileType[], item:FileType) {
    if( acc.findIndex( finderMethod(item.path) )===-1 ) return [...acc, item]
    return acc
}

function finderMethod(pivotPath:string) {
    return ({ path }:{ path:string })=>path===pivotPath
}

export const getBranchDetail = async (user:string, repo:string, token?:string) => {
    const headers = new Headers()
    headers.set("Accept", "application/vnd.github+json")
    headers.set("X-GitHub-Api-Version","2022-11-28")
    if( token ) headers.set("Authorization", `Bearer ${token}`)
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, { headers})
    if( response.status !== 200 ) return { default_branch:"", visibility:"", language:""}
    const { default_branch, visibility, language } =  await response.json()
    return { default_branch, visibility, language }
}

export const getFromUrl = (url:string) => url.replaceAll(/(http|https):\/\/github.com\//g, "").replaceAll(/\?.{1,}/g,"").replaceAll("/"," ").trim().split(" ")


export const generateGithubUrl = () => {
    const search = new URLSearchParams()
    search.set("client_id", process.env.GITHUB_CLIENT_ID as string)
    search.set("redirect_uri", `${process.env.LOCALHOST}/success`)
    return `https://github.com/login/oauth/authorize?${search.toString()}`
}