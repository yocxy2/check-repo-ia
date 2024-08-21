import { resolve } from "path"

export default class GithubService {

    static async generateToken(code: string){
        const search = new URLSearchParams()
        search.set("client_id", process.env.GITHUB_CLIENT_ID as string)
        search.set("client_secret", process.env.GITHUB_CLIENT_SECRECT as string)
        search.set("code", code)

        try{
            const headers = new Headers()
            headers.set("Accept", "application/json")
            const response = await fetch(`https://github.com/login/oauth/access_token?${search.toString()}`, {
                headers,
                cache:'no-cache'
            })
            const data = await response.json()
            if( data?.error ) throw new Error(data?.error_description)
            return {
                error: false,
                description: "",
                data
            }
        } catch(e:any) {
            console.error(e)
            return {
                error: true,
                description: e.message,
                data: null
            }
        }
    }

    static async getContentFile(user: string, repo: string, file: string, main: string, token: string){
        try{
            const headers = new Headers()
            headers.set("Accept", "application/vnd.github.raw+json")
            headers.set("X-GitHub-Api-Version","2022-11-28")
            headers.set("Authorization", `Bearer ${token}`)
            const response = await fetch(`  https://api.github.com/repos/${user}/${repo}/contents/${file}?ref=${main}`, { headers })
            if(response.status !== 200) throw new Error("No se pudo obtener el contenido del archivo | Code "+response.status+": "+response.statusText)
            const value = await response.text()
            return {
                error: false,
                description: "",
                data: value
            }
        }catch(e:any){
            console.error(e)
            return {
                error: true,
                description: e.message,
                data: ""
            }
        }
    }
}