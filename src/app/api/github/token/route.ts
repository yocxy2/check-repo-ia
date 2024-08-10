import GithubService from "@/tools/GithubService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const { code } = await request.json()
    if( !code ) return NextResponse.json({
        error: true,
        description: "Invalid code",
        data: null
    })
    const { data, description, error } = await GithubService.generateToken(code)

    return NextResponse.json({ error, description, data })

}