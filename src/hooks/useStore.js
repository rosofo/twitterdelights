import fabricateContext from './fabricateContext';
import useLocalStorage from './useLocalStorage';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const initialTweetsState = {
  data: [],
  meta: {}
}

export const {
  Provider: StoreProvider,
  Consumer: StoreConsumer,
  useContext: useStore,
} = fabricateContext((props) => {
  const [loading, setLoading] = useState(false)
  const [usernames, setUsernames] = useLocalStorage('usernames', [])
  const addUsername = (username) => setUsernames([...new Set([...usernames, username])])
  const removeUsername = (username) => setUsernames(usernames.filter(u => u !== username))
  
  const [tweets, setTweets] = useState(initialTweetsState)
  useEffect(() => {
    if (usernames.length === 0) {
      setTweets(initialTweetsState)
      return
    }
    (async () => {
      setLoading(true)
      try {
        console.log("will search ", usernames)
        const { data } = await Axios.get(`/api/getTweets?usernames=${usernames.join(',')}`)
        console.log(data)
        setTweets(data)
      } catch (err) {
      }
      setLoading(false)
    })()
  }, [usernames])

  return {
    usernames,
    addUsername,
    removeUsername,
    tweets,
    loading,
  }
})