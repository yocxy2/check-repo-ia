"use client"
import ListFile from "./ListFile"

interface NavigationDirectoryProps {
    files: FileType[],
    onSelect: (file: string) => void,
    path: string
}



export default function NavigationDirectory({ files, onSelect, path}:NavigationDirectoryProps) {

    // // crear estructura de directorios para archivos y carpetas
    const directory:FileDirectoryType[] = files.reduce( (acc:FileDirectoryType[],item:FileType)=>{
        // if( item.path.split("/").length === 1 ) return [...acc, { name:item.name, path:"", files: []}]
        const path = item.path.split("/").slice(0, -1).join("/")
        const folder = acc.find( (item:FileDirectoryType) => item.path === path )
        if( folder ) {
            folder.files.push({name:item.name, path:item.path, files: []})
        } else {
            acc.push({
                name: path,
                path,
                files: [{name:item.name, path:item.path, files: []}]
            })
        }
        return acc
    },[])

    const paths = files.reduce( (acc:string[],item:FileType)=>{
        const newItem = item.path.split("/").slice(0,-1).join("/")
        return acc.includes(newItem) ? acc : [...acc, newItem ]
    },[]).sort(()=>-1)


    return (
        <div className="flex flex-col items-start justify-start w-full p-4">
            { paths.map( (pathName, index) => <div key={`folderid-${index}`} className="flex flex-col items-start justify-start w-full">
                <div className="font-bold ">/ { pathName }</div>
                <ListFile files={ files.filter( file => file.path.split("/").slice(0,-1).join("/")===pathName ) } onSelect={onSelect} path={path} />
            </div>)}
        </div>
    )
}