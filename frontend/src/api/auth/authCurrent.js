import { fetchGet } from '../utils'

export async function authCurrent() {
  return fetchGet(
    '/auth/current'
  )
}