import { fetchGet } from '../utils';

export async function getAllFruits() {
  return fetchGet(
    '/fruits'
  )
}