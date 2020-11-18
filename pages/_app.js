import '../styles/globals.css'
import useGA from  '../src/hooks/useGA'

function MyApp({ Component, pageProps }) {
  useGA()
  return <>
    <Component {...pageProps} />
  </>
}

export default MyApp
