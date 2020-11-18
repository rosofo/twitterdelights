const { MediaProvider } = require("../hooks/useMediaContext")
import { useStore } from '../hooks/useStore';
import MediaList from './MediaList';

const Results = () => {
  const { username, tweets: { meta, data } } = useStore()
  if (!meta.result_count) {
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

export default Results