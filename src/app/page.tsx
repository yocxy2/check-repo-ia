import Slider from "@/components/Slider"
import { ERROR } from "@/tools/constants"
import ButtonGithub from "@/components/ButtonGithub"
import { generateGithubUrl } from "@/tools/common"
import SectionSearch from "@/sections/SectionSearch"

export default function Page({ searchParams }: { searchParams: { error:string } }) {
    const { error } = searchParams

    const messageError = {
        [`${ERROR.NOT_PUBLIC}`]: ERROR.NOT_PUBLIC_DESC,
        [`${ERROR.INVALID_URL}`]: ERROR.INVALID_URL_DESC,
        [`${ERROR.RATE_LIMIT}`]: ERROR.RATE_LIMIT_DESC,
        [`${ERROR.NOT_FOUND}`]: ERROR.NOT_FOUND_DESC,
    }[error]

    const href = generateGithubUrl()

    return <main className="flex gap-8 min-h-screen flex-col items-center justify-center p-2 max-w-4xl mx-auto">
            <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20">
                <Slider />
            </div>
            <SectionSearch errorDefault={messageError}/>
            <div className="border border-indigo-100 shadow-lg shadow-indigo-200 rounded-lg bg-white p-10 w-2/3 z-20">
                <p className="text-left">Accede con tu cuenta de github para mejores caracteristicas</p>
                <span className="flex w-fit mx-auto mt-2">
                    <ButtonGithub label="Acceder con Github" href={href}/>
                </span>
            </div>
        </main>
}
