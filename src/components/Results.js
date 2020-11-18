const { MediaProvider } = require("../hooks/useMediaContext")
import { useStore } from '../hooks/useStore';
import MediaList from './MediaList';

const Results = () => {
  const { username, tweets: { meta, data } } = useStore()
  if (!meta.result_count) {
    return <div>
      Oops, looks like none of the users you chose posted in the past week!
    </div>
  }
  return <div>
    <MediaProvider>
      <MediaList tweets={data} />
    </MediaProvider>
  </div>
}

export default Results