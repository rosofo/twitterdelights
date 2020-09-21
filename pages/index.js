import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../src/hooks/useDebounce.js'
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
    <input autoFocus="true" className="focus:outline-none focus:border-gray-700 border-b border-gray-400  py-1 ml-4 pr-2" placeholder="Search by twitter username" type={'text'} value={username} onChange={({ target: { value } }) => setUsername(value)}/>
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
      target="_blank"
    >See the complete feed on twitter</a>
    <MediaProvider>
      <MediaList tweets={data} />
    </MediaProvider>
  </div>
}

const exampleAccounts = [
  // 'keinobjekt',
  'sk33mask',
  'BAKEGLA',
  'delightsdiggers'
]

const WelcomeCTA = ({ setUsername }) => {

  return <div className={`${styles.intro} text-center`}>
    <div className="font-bold mb-2 text-2xl">
      Twitter Delights
    </div>
    Your final stop to check out to all these
    <br />
    great-looking tracks posted by that person on twitter
    <br />
    <div className="text-gray-700 mt-2">
      Need inspiration? Try one of these fine ones:
      <br/> 
      {exampleAccounts
        .map(account => <span key={account} className="underline hover:no-underline cursor-pointer" onClick={() => setUsername(account)}>{account}</span>)
        .reduce((prev, curr, i) => [prev, i !== exampleAccounts.length - 1 ? ', ' : ' or ', curr])
      }
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
        <div className={`mb-16 mt-8 ${styles.appear} sticky top-0 w-full z-10 flex justify-center bg-white pb-2`}>
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
          <div className="text-gray-600 text-xs">
            Made with ♥️ by&nbsp;<a className="underline hover:no-underline" href="http://walidvb.com" target="_blank">walidvb</a>, creator of (wip) <a className="underline hover:no-underline" href="http://www.diggersdelights.net/curated" target="_blank">diggersdelights</a> and (co-) of <a href="https://reveel.id" className="underline hover:no-underline" target="_blank">reveel.id</a> 🚀
          </div>
      </footer>
    </div>
  )
}
