import { fetchGet } from '../utils';

export async function getAllFruitsClient() {
  return fetchGet(
    '/fruits/user'
  )
}