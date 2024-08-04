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