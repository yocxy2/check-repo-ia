"use server"

import { cookies } from "next/headers"


export const getToken = () => {
    const store = cookies()
    return store.get("check-repo-token")?.value as string
}

export const setToken = (token: string) => {
    const store = cookies()
    store.set("check-repo-token", token)
}