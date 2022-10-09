import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css'
import { Carousel } from '@mantine/carousel'

function Featured() {

    const images = [
        "/img/featured1.png",
        "/img/featured2.png",
        "/img/featured3.png"
    ];

  return (
    <div className={styles.container}>
        <Carousel slideSize="70%" height="100%" sx={{ flex: 1 }}
         slideGap="sx" controlsOffset="md" controlSize={28} loop withIndicators>
            {images.map((img, i) => (
                    <Carousel.Slide key={i}>
                        <Image src={img} alt="" layout='fill' objectFit='contain'/>
                    </Carousel.Slide>         
            ))}
        </Carousel>
    </div>
  );
}

export default Featured