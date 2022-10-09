import React from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Grid } from '@mantine/core'


const Navbar = () => {

    const quantity = useSelector((state) => state.cart.quantity)

    return (
        <div className={styles.container}>
            <Grid justify="space-around" align="center">
            <Grid.Col span="content">
                <div className={styles.item}>
                    <div className={styles.callButton}>
                        <Image src="/img/telephone.png" layout="responsive" alt="" width="32" height="32" />
                    </div>
                    <div className={styles.texts}>
                        <div className={styles.text}>ORDER NOW</div>
                        <div className={styles.text}>777 777 777</div>
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col span={6}>
                <div className={styles.item}>
                    <ul className={styles.list}>
                        <Link href={"/"} passHref>
                            <li className={styles.listItem}>Homepage</li>
                        </Link>
                        <li className={styles.listItem}>Products</li>
                        <li className={styles.listItem}>Menu</li>
                        <Link href={"/"} passHref>
                            <a><Image className={styles.img} src="/img/logo.png" alt="" width="160px" height="69px" /></a>
                        </Link>
                        <li className={styles.listItem}>Events</li>
                        <li className={styles.listItem}>Blog</li>
                        <li className={styles.listItem}>Contact</li>
                    </ul>
                </div>
            </Grid.Col>
            <Grid.Col span={2}>
                <Link href="/cart" passHref>
                    <div className={styles.divCart}>
                        <div className={styles.cart}>
                            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                            <div className={styles.counter}>{quantity}</div>
                        </div>
                    </div>
                </Link>
            </Grid.Col>
            </Grid>
        </div>
    )
}

export default Navbar