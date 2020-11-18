import TwitterIcon from './TwitterIcon';

const SearchInput = ({ username, setUsername }) => {
  return <div className="flex items-center" >
    {username.length ? <a
      href={`https://twitter.com/${username}`}
      target="_blank"
      className="opacity-75 hover:opacity-100"
    >
      <TwitterIcon />
    </a>
      : <span className="opacity-50"><TwitterIcon /></span>
    }
    <input autoFocus="true" className="focus:outline-none focus:border-gray-700 border-b border-gray-400  py-1 ml-4 pr-2" placeholder="Search by twitter username" type={'text'} value={username} onChange={({ target: { value } }) => setUsername(value)} />
  </div>
}

export default SearchInput