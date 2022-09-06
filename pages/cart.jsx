import React from 'react'
import Image from 'next/image'
import styles from '../styles/Cart.module.css'

function Cart() {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tr className={styles.tr}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </table>
            </div>
            <div className={styles.right}></div>
        </div>
    )
}

export default Cart