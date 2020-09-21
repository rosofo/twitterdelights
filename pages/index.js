import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../src/useDebounce.js'
import Media from '../src/components/Media'

const MediaList = ({ tweets }) => {
  return <div>
    {tweets.map(t => <div key={t.id} className="mb-2">
      <Media tweet={t} key={t.id} />
    </div>)}
  </div>
}

const SearchInput = ({ username, setUsername }) => {
  return <input className="border-b border-gray-400 text-center py-1 px-2" placeholder="Enter a twitter handle" type={'text'} value={username} onChange={({ target: { value } }) => setUsername(value)}/>
}

const Results = ({ tweets: { meta, data } }) => {
  if(!meta.result_count){
    return <div>
      No Results...
    </div>
  }
  return <MediaList tweets={data} />
}

const NoQuery = () => {
  return null
}
const initialTweetsState = {
  data: [],
  meta: { }
}

export default function Home() {
  const [tweets, setTweets] = useState(initialTweetsState)
  const [username, setUsername] = useState('sk33mask')
  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    if(username.length === 0){
      setTweets(initialTweetsState)
      return
    }
    (async () => {
      const { data } = await Axios.get(`/api/getTweets?username=${debouncedUsername}`)
      setTweets(data)
    })()
  }, [debouncedUsername])

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Delights</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css" />
      </Head>

      <main className={styles.main}>
        <div className="my-16 mt-32">
          <SearchInput username={username} setUsername={setUsername} />
        </div>
        { username.length ? <Results tweets={tweets} /> : <NoQuery /> }
      </main>

      <footer className={styles.footer}>
          <div className="text-underline">
            Twitter Delights
          </div>
          <div>
            Made with ♥️ by&nbsp; <a href="http://walidvb.com" target="_blank">walidvb</a>
          </div>
      </footer>
    </div>
  )
}
