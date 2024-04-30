import { fetchGet } from '../utils';

export async function getAllTransactionsClient() {
  return fetchGet(
    '/transactions/user'
  )
}