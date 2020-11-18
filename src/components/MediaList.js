import Media from './Media';

const MediaList = ({ tweets }) => {
  return <div>
    {tweets.map(t => <div key={t.id} className="mb-2">
      <Media tweet={t} key={t.id} />
    </div>)}
  </div>
}
export default MediaList