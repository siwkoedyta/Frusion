import { fetchGet } from '../utils';

export async function getAllBoxes() {
  return fetchGet(
    '/boxes'
  )
}