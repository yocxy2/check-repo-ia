interface NavigationDirectoryProps {
    files: FileType[],
    onSelect: (file: string) => void,
    path: string
}


export default function NavigationDirectory({ files, onSelect, path}:NavigationDirectoryProps) {


    return (
        <div className="flex flex-col items-start justify-start w-full">
            {files.map((file, index) => (
                <button
                    key={index}
                    className={`text-left w-full py-1 px-2 text-sm ${path === file.path ? "bg-blue-300" : "hover:bg-gray-200"} focus:outline-none`}
                    onClick={()=>onSelect(file.path)}
                >{file.name}</button>
            ))}
        </div>
    )
}