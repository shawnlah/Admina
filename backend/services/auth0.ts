import axios, { AxiosRequestConfig } from 'axios'

const auth0Client = axios.create({
  baseURL: process.env.AUTH0_ISSUER
})

export default auth0Client

export const getAuth0Token = async () => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: process.env.AUTH0_GRANT_TYPE,
      client_id: process.env.AUTH0_ADMIN_CLIENT_ID,
      client_secret: process.env.AUTH0_ADMIN_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER}/api/v2/`
    }
  }
  try {
    return (await auth0Client(options)).data.access_token
  } catch (error) {
    console.log('Error getting token from auth0', error)
    throw (error)
  }
}
