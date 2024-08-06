"use client"
import { useEffect, useRef, CSSProperties } from "react"

type FollowMouseProps = {
    className?: string
    style?: CSSProperties
    offsetX?: number
    offsetY?: number
}

export default function FollowMouse({ className, style, offsetX=0, offsetY=0}:FollowMouseProps) {
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if(followerRef.current){
                followerRef.current.style.left = `${e.clientX - offsetX}px`
                followerRef.current.style.top = `${e.clientY - offsetY}px`
                followerRef.current.style.backgroundPositionX = `${offsetX - e.clientX}px`
                followerRef.current.style.backgroundPositionY = `${offsetY - e.clientY}px`
            }
        }
        window.addEventListener("mousemove", onMouseMove)
        return () => window.removeEventListener("mousemove", onMouseMove)

    },[offsetX, offsetY])


    return <div
        ref={followerRef}
        className={className}
        style={style}
    />
}