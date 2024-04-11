import { fetchPost } from './utils'

export async function register( email, password, frusionName ) {
  return fetchPost(
    '/register',
    {
        email: email,
        password: password,
        frusionName: frusionName
    }
  )
}