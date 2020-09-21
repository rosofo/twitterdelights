import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../src/useDebounce.js'
import Media from '../src/components/Media'
import { BoxLoading } from 'react-loadingg'

const MediaList = ({ tweets }) => {
  return <div>
    {tweets.map(t => <div key={t.id} className="mb-2">
      <Media tweet={t} key={t.id} />
    </div>)}
  </div>
}

const SearchInput = ({ username, setUsername }) => {
  return <input autofocus="true"  className="focus:outline-none focus:border-gray-700 border-b border-gray-400 text-center py-1 px-2" placeholder="Type a twitter handle" type={'text'} value={username} onChange={({ target: { value } }) => setUsername(value)}/>
}

const Results = ({ username, tweets: { meta, data } }) => {
  if(!meta.result_count){
    return <div>
      No Results...
    </div>
  }
  return <div>
    <a 
      href={`https://twitter.com/${username}`}
      className=" mb-4 block text-sm text-gray-700"
    >See on twitter</a>
    <MediaList tweets={data} />
  </div>
}

const NoQuery = ({ setUsername }) => {
  return <div className="text-center">
    <div className="font-bold mb-2 text-2xl">
      Twitter Delights
    </div>
    See all youtube videos posted by twitter users
    <br />
    <span className="text-gray-700">
      Examples: <span className="underline hover:no-underline cursor-pointer" onClick={() => setUsername('sk33mask')}>sk33mask</span> or <span className="underline hover:no-underline cursor-pointer" onClick={() => setUsername('delightsdiggers')}>delightsdiggers</span>
    </span>
  </div>
}
const initialTweetsState = {
  data: [],
  meta: { }
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState(initialTweetsState)
  const [username, setUsername] = useState('')
  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    if(username.length === 0){
      setTweets(initialTweetsState)
      return
    }
    (async () => {
      setLoading(true)
      try{
        const { data } = await Axios.get(`/api/getTweets?username=${debouncedUsername}`)
        setTweets(data)
      } catch(err){
      }
      setLoading(false)
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
        <div className={`my-16 mt-32 ${styles.appear}`}>
          <SearchInput username={username} setUsername={setUsername} />
        </div>
        {
          loading ? <div className="relative"><BoxLoading color="#ABC" /></div>
          : username.length ? 
            <Results username={username} tweets={tweets} /> 
            : <NoQuery setUsername={setUsername} /> 
        }
      </main>

      <footer className={styles.footer}>
          <div className="text-gray-600 text-sm">
            Made with ♥️ by&nbsp;<a className="underline hover:no-underline" href="http://walidvb.com" target="_blank">walidvb</a>, author of <a className="underline hover:no-underline" href="https://www.diggersdelights.net" target="_blank">diggersdelights</a>
          </div>
      </footer>
    </div>
  )
}
