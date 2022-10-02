import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

function PizzaList({pizzaList}) {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>BEST PIZZA IN TOWN!</h1>
        <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Nullam dapibus fermentum ipsum.
        Nulla non lectus sed nisl molestie malesuada.
        </p>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza) => (
            <PizzaCard pizza={pizza} key={pizza._id}></PizzaCard>
          ))
          }
        </div>
    </div>
  )
}

export default PizzaList