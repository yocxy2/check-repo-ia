export default function ListFile({ files, onSelect, path }: { files: FileType[], onSelect: (file: string) => void, path: string }) {
    return files.map( (file, index) => <>
        <button
            key={index}
            className={`text-left w-full py-1 px-2 text-sm ${path === file.path ? "bg-blue-300" : "hover:bg-gray-200"} focus:outline-none`}
            onClick={()=>onSelect(file.path)}
        >{file.name}</button>
    </>)
}