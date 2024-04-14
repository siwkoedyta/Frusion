import { fetchGet } from '../utils'

export async function authCurrentAdmin() {
  return fetchGet(
    '/auth/current'
  )
}