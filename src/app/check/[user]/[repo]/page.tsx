import CheckerFile from "@/sections/CheckerFile"
import SectionStorage from "@/sections/SectionStorage"
import { recursiveFetch } from "@/tools/common"

export default async function Page({ params }:{ params: { user: string, repo: string } }) {
    const { user, repo } = params

    const result = await recursiveFetch(user, repo)

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-start p-24 max-w-7xl mx-auto">
        <section>
            <h1 className="text-4xl font-bold text-center">Check</h1>
            <h2 className="text-2xl font-bold text-center flex flex-row gap-10">
                <span>User: {user}</span>
                <span>Repo: {repo}</span>
            </h2>
        </section>
        <SectionStorage value={{
            files:result,
            user:user,
            repo:repo 
        }}/>
    </main>
}