import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import styles from '../styles/Home.module.css'

const Media = ({ tweet }) => {
  const url = tweet.entities.urls[0].expanded_url
  if (!ReactPlayer.canPlay(url)){
    return null
  }
  return <div>
    <ReactPlayer url={url} />
  </div>
}

const MediaList = ({ tweets }) => {
  return <div>
    {tweets.map(t => <div key={t.id} className="mb-2">
      <Media tweet={t} key={t.id} />
    </div>)}
  </div>
}

export default function Home() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    (async () => {
      const { data: { data } } = await Axios.get('/api/getTweets')
      setTweets(data)
    })()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Delights</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css" />
      </Head>

      <main className={styles.main}>
        <MediaList tweets={tweets} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ♥️ by &nbsp;
          <a href="http://walidvb.com" target="_blank">walidvb</a>
        </a>
      </footer>
    </div>
  )
}
