import Axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../src/hooks/useDebounce.js'
import { BoxLoading } from 'react-loadingg'
import Results from '../src/components/Results';
import SearchInput from '../src/components/SearchInput';
import { StoreProvider, StoreConsumer } from '../src/hooks/useStore'

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

export default function Home() {
  const [loading, setLoading] = useState(false)
  
  const [username, setUsername] = useState('')

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Delights</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css" />
      </Head>
      <StoreProvider>
        <main className={styles.main}>
          <div className={`mb-16 mt-8 ${styles.appear} sticky top-0 w-full z-10 flex justify-center bg-white pb-2`}>
            <SearchInput username={username} setUsername={setUsername} />
          </div>
          <StoreConsumer>
            {({ usernames }) => (
                loading ? <div className="relative"><BoxLoading color="#ABC" /></div>
                : usernames.length ? 
                  <Results /> 
                  : <WelcomeCTA setUsername={setUsername} /> 
            )}
          </StoreConsumer>
        </main>
      </StoreProvider>

      <footer className={styles.footer}>
          <div className="text-gray-600 text-xs">
            Made with ♥️ by&nbsp;<a className="underline hover:no-underline" href="http://walidvb.com" target="_blank">walidvb</a>, creator of (wip) <a className="underline hover:no-underline" href="http://www.diggersdelights.net/curated" target="_blank">diggersdelights</a>🎶 and (co-) of <a href="https://reveel.id" className="underline hover:no-underline" target="_blank">reveel.id</a> 🚀 (<a href="https://github.com/walidvb/twitterdelights" target="_blank" className="underline hover:no-underline">source code</a> 🧑‍💻)
          </div>
      </footer>
    </div>
  )
}
