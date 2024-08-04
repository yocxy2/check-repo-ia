import { google } from "@ai-sdk/google"
import { streamObject } from 'ai'
import { checkSchema } from './schema'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
    const context = await req.json()
    const response = await fetch(`https://raw.githubusercontent.com/${context.user}/${context.repo}/main/${context.file}`)
    const value = await response.text()

    const result = await streamObject({
        model: google("models/gemini-1.5-pro-latest"),
        schema: checkSchema,
        prompt: `Analiza el archivo ${context.file} de un proyecto de Nextjs e identifica si contiene malas practicas, identifica posibles mejoras, este es el contenido del archivo: ${value}`,
    })

    return result.toTextStreamResponse()
}