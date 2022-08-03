import React from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css'

function Featured() {
    const images = [
        "/img/featured1.png",
        "/img/featured2.png",
        "/img/featured3.png"
    ];


    return (
        <div className={styles.container}>
            <Image src="/img/arrowl.png" alt="" layout='fill' />
            <div className={styles.wrapper}></div>
            <div className={styles.imgContainer}>
                {images.map((img, i) =>
                    <Image src="/img/featured.png" key={i} alt="" layout='fill' />
                )}

            </div>
            <Image src="/img/arrowr.png" alt="" layout='fill' />
        </div>
    )
}

export default Featured