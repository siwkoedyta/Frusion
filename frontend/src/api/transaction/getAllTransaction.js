import { fetchGet } from '../utils';

export async function getAllTransactions() {
  return fetchGet(
    '/transactions'
  )
}