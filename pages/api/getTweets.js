// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Axios from 'axios';

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

const getBearerToken = async () => {
  const oauthUrl = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'
  const { data: { access_token } } = await Axios.post(oauthUrl, {
    grant_type: 'client_credentials'
  }, {
    auth: {
      username: process.env.TWITTER_API_KEY,
      password: process.env.TWITTER_API_SECRET_KEY,
    }
  })
  return access_token
}

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

export default async (req, res) => {
  const usernames = req.query.usernames
  try{
    const bearerToken = BEARER_TOKEN || await getBearerToken()
    // currently only fetch youtube links
    const params = {
      'query': `(${usernames.split(',').map(u => `from:${u}`).join(' OR ')}) url:youtube`,
      max_results: 100,
      'tweet.fields': 'entities',
      'expansions': 'author_id',
    }
    const { data } = await Axios.get(endpointUrl, { 
      params,
      headers: {
        "authorization": `Bearer ${bearerToken}`
      }
    })
    res.json(data)
  } catch(err){
    console.error(err)
    res.json(err)
  }
}
