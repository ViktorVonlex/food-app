import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import axios from 'axios'

export default function Home({pizzaList}) {
  return (
    <div className={styles.container}>
      <Featured />
      <PizzaList pizzaList={pizzaList}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get("https://food-app-alpha-one.vercel.app/api/products")
  console.log(res)
  return {
    props: {
      pizzaList: res.data
    }
  }
}
