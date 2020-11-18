import { useStore } from '../hooks/useStore';
import Media from './Media';

const MediaList = ({ tweets }) => {
  const { tweets: { includes: { users } } } = useStore()
  
  return <div>
    {tweets.map((t, i) => {
      const user = users.find(u => u.id === t.author_id)
      return <div key={t.id} className="mb-2 ">
        <Media tweet={t} key={t.id} index={i} />
        <div class="mb-4 text-gray">
          <a 
            className="text-gray-600 italic hover:underline ml"
            href={`https://twitter.com/${user.username}/status/${t.id}`} 
            target="_blank"
          >
            {user.username}
          </a>
          {/* <div className="mt-1">
            {t.text}
          </div> */}
        </div>
      </div>
    })}
  </div>
}
export default MediaList