import { fetchPost } from '../utils'

export async function addClient(firstName, lastName, email, password) {
  return fetchPost(
    '/clients',
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
  )
}