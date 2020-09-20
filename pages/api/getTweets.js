// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Axios from 'axios';

const API_KEY = 'SaGXxXsATwJ94PJT0KVYjgb3f'
const API_SECRET_KEY = 'hn4nLjPplFOebdPEzZC6iM0G66qJX1UHbGIs1m1mrXA0dwIBc5'

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

const getBearerToken = async () => {
  const oauthUrl = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'
  const { data: { access_token } } = await Axios.post(oauthUrl, {
    grant_type: 'client_credentials'
  }, {
    auth: {
      username: API_KEY,
      password: API_SECRET_KEY,
    }
  })
  return access_token
}

export default async (req, res) => {
  const username = req.query.username
  try{
    const bearerToken = await getBearerToken()
    // currently only fetch youtube links
    const params = {
      'query': `from:${username} url:youtube`,
      max_results: 10,
      'tweet.fields': 'entities'
    }
    const { data } = await Axios.get(endpointUrl, { 
      params,
      headers: {
        "authorization": `Bearer ${bearerToken}`
      }
    })
    res.json(data)
  } catch(err){
    console.log(err)
    res.json({ name: 'John Doe' })
  }
}
