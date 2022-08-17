import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css'

function Featured() {
    const [sliderIndex, setSliderIndex] = useState(0)

    const handleArrow = (direction) => {
        if(direction==='l'){
            setSliderIndex(sliderIndex !== 0 ? sliderIndex-1 : 2)
        }
        if(direction==='r'){
            setSliderIndex(sliderIndex !== 2 ? sliderIndex+1 : 0)
        }
    }

    const images = [
        "/img/featured1.png",
        "/img/featured2.png",
        "/img/featured3.png"
    ];


    return (
        <div className={styles.container}>
            <div className={styles.wrapper} style={{transform:`translateX(${-100*sliderIndex}vw)`}}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                        <Image src={img} alt="" layout='fill' objectFit='contain'/>
                    </div>
                ))}
            </div>
            <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
                <Image src="/img/arrowr.png" alt="" layout='fill' />
            </div>
            <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleArrow("l")}>
                <Image src="/img/arrowl.png" alt="" layout='fill' />
            </div>
        </div>
    )
}

export default Featured