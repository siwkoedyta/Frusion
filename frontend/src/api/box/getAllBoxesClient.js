import { fetchGet } from '../utils';

export async function getAllBoxesClient() {
  return fetchGet(
    '/boxes/user'
  )
}