import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../src/useDebounce.js'
import Media from '../src/components/Media'
import { BoxLoading } from 'react-loadingg'
import { MediaProvider } from '../src/hooks/useMediaContext'
import TwitterIcon from '../src/components/TwitterIcon'

const MediaList = ({ tweets }) => {
  return <div>
    {tweets.map(t => <div key={t.id} className="mb-2">
      <Media tweet={t} key={t.id} />
    </div>)}
  </div>
}

const SearchInput = ({ username, setUsername }) => {
  return <div className="flex items-center" >
    { username.length ? <a 
      href={`https://twitter.com/${username}`} 
      target="_blank"
      className="opacity-75 hover:opacity-100"
    >
      <TwitterIcon />
    </a>
      : <span className="opacity-50"><TwitterIcon /></span>
  }
    <input autofocus="true" className="focus:outline-none focus:border-gray-700 border-b border-gray-400  py-1 ml-4 pr-2" placeholder="Type a twitter handle" type={'text'} value={username} onChange={({ target: { value } }) => setUsername(value)}/>
  </div>
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
    >Let me see {username} on twitter</a>
    <MediaProvider>
      <MediaList tweets={data} />
    </MediaProvider>
  </div>
}

const WelcomeCTA = ({ setUsername }) => {
  return <div className={`${styles.intro} text-center`}>
    <div className="font-bold mb-2 text-2xl">
      Twitter Delights
    </div>
    The final stop to listen to all these
    <br />
    great-looking tracks posted by that guy on twitter
    <br />
    <div className="text-gray-700 mt-2">
      Have a look: 
        &nbsp;<span className="underline hover:no-underline cursor-pointer" onClick={() => setUsername('sk33mask')}>skeemask</span>,
        &nbsp;<span className="underline hover:no-underline cursor-pointer" onClick={() => setUsername('BAKEGLA')}>bake</span>
        &nbsp;or&nbsp;
        <span className="underline hover:no-underline cursor-pointer" onClick={() => setUsername('delightsdiggers')}>delightsdiggers</span>
    </div>
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
            : <WelcomeCTA setUsername={setUsername} /> 
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
