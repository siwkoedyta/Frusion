import { fetchPost } from './utils'

export async function auth(email, password) {
  return fetchPost(
    '/auth',
    {
      email: email,
      password: password,
    }
  )
}