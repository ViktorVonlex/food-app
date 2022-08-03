import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'

export default function Home() {
  return (
    <div className={styles.container}>


      <Head>
        <title>Vonlex Pizza</title>
        <meta name="description" content="Next best pizza chain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />

    </div>
  )
}
