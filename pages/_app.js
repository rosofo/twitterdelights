import '../styles/globals.css'
import useGA from  '../src/hooks/useGA'
import useFullStory from '../src/hooks/useFullStory';

function MyApp({ Component, pageProps }) {
  useGA()
  useFullStory()
  return <>
    <Component {...pageProps} />
  </>
}

export default MyApp
