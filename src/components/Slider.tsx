"use client"

import { useState, useEffect } from "react"
import SideArrows from "./SideArrows"

const list = [
    {
        title: "¿Quieres mejorar tu código?",
        description: "Ingresa la URL de tu repositorio de GitHub y te diremos cómo puedes mejorar tu código."
    },
    {
        title: "¿Quieres asegurarte la calidad del código que compras?",
        description: "Ingresa la URL de tu repositorio de GitHub y te diremos si el código que estás comprando es de calidad. No pierdas dinero"
    },
    {
        title: "No mas código basura",
        description: "Empieza a mejorar tu código con las recomendaciones que te daremos."
    },
    {
        title: "Y pronto más",
        description: "Estamos trabajando en nuevas funcionalidades para ayudarte a mejorar tu código."
    }
]
export default function Slider() {
    const [index, setIndex] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

    const moveSlide = (slides:NodeListOf<HTMLSpanElement>) => {
        setIndex( (prevIndex:number) => {
            slides[prevIndex].style.opacity = '0'
            return prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        } )
    }

    useEffect(() => {
        const slider = document.querySelector(".slider")
        const slides = slider?.querySelectorAll("span") as NodeListOf<HTMLSpanElement>
        if( slides && slides.length <= 1 ) return
        const interval = setInterval(moveSlide, 5000, slides)
        setIntervalId(interval)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const slider = document.querySelector(".slider")
        const slides = slider?.querySelectorAll("span") as NodeListOf<HTMLSpanElement>
        slides[index].style.opacity = '1'
    }, [index])

    const handlerChange = (value:1|-1) => {
        if(intervalId) clearInterval(intervalId)
        const slider = document.querySelector(".slider")
        const slides = slider?.querySelectorAll("span") as NodeListOf<HTMLSpanElement>
        if( !slides ) return
        slides[index].style.opacity = '0'
        if( index + value < 0 ) setIndex( slides.length - 1 )
        else if( index + value > slides.length - 1 ) setIndex(0)
        else setIndex( index + value )
        setIntervalId( setInterval(moveSlide, 5000, slides) )
    }


    return <div className="slider relative h-24" >{list.map( (item, index) => <span className={"absolute top-0 transition-opacity " + (index!==0 && "opacity-0")} key={item.title.replaceAll(" ","_")} data-id={index}>
        <h2 className="text-lg font-bold mb-2">{ item.title }</h2>
        <p className="text-md" dangerouslySetInnerHTML={{ __html:item.description }} />
        <div className="flex flex-row gap-2 items-center justify-end">
            <SideArrows onNext={handlerChange} onBack={handlerChange} />
        </div>
    </span>)}
    </div>
}