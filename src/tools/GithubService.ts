export default class GithubService {

    static async generateToken(code: string){
        const search = new URLSearchParams()
        search.set("client_id", process.env.GITHUB_CLIENT_ID as string)
        search.set("client_secret", process.env.GITHUB_CLIENT_SECRECT as string)
        search.set("code", code)

        try{
            const headers = new Headers()
            headers.set("Accept", "application/json")
            console.log(`https://github.com/login/oauth/access_token?${search.toString()}`)
            const response = await fetch(`https://github.com/login/oauth/access_token?${search.toString()}`, {
                headers,
                cache:'no-cache'
            })
            const data = await response.json()
            console.log(data)
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
}