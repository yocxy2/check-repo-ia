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


export const recursiveFetch = async (user:string, repo:string, path:string = "", results:fileRepo[] = []) => {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`, {  })
    const data = await response.json()

    let files = data.filter( (item:fileRepo) => item?.type==='file' ).map((item:fileRepo, index:number) => ({ name:item.name, path:item.path, numberFixes: 0, rate:0, deep: item.name.split("/").length - 1 }) )

    const folders = data.filter( (item:fileRepo) => item?.type==='dir' ).map((item:fileRepo) => item.path)

    if( folders.length === 0 ) return [...files, ...results]
    for( const folder of folders ) {
        const filesInFolders = await recursiveFetch(user, repo, folder, results) as fileRepo[]
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

export const getBranchMain = async (user:string, repo:string) => {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}`)
    if( response.status !== 200 ) return null
    const { default_branch } = await response.json()
    return default_branch
}