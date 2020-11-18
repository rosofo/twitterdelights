import TwitterIcon from './TwitterIcon';
import { useStore } from '../hooks/useStore';

const UserSelected = ({ username }) => {
  const { removeUsername } = useStore()
  return <div class="flex items-center">
    <div className="mr-1" onClick={() => removeUsername(username)}>
      X
    </div>
    <a
    href={`https://twitter.com/${username}`}
    target="_blank"
    className="opacity-75 hover:opacity-100 flex"
    >
      {username}
    </a>
  </div>
}

const SearchInput = ({ username }) => {
  const { addUsername, usernames } = useStore()
  const handleEnter = (target) => {
    addUsername(target.value)
    target.value = ''
  }
  return <div className="" >
    <div class="flex items-center">
      <span className="opacity-50"><TwitterIcon /></span>
      <input 
        autoFocus="true"
        className="focus:outline-none focus:border-gray-700 border-b border-gray-400  py-1 ml-4 pr-2"
        placeholder="Search by twitter username"
        type={'text'}
        onKeyDown={({ keyCode, target }) => keyCode === 13 && handleEnter(target)}
      />
    </div>
    <div className="mt-4">
      {usernames.map(u => <UserSelected key={u} username={u}/>)}
    </div>
  </div>
}

export default SearchInput