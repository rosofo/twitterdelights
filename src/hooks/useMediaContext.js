import fabricateContext from './fabricateContext';
import { useState } from 'react';

export const { 
  Provider: MediaProvider, 
  useContext: useMediaContext 
} = fabricateContext(() => {
  const [nowPlaying, setNowPlaying] = useState()
  return {
    nowPlaying, 
    setNowPlaying
  }
})