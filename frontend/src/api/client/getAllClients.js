import { fetchGet } from '../utils';

export async function getAllClients() {
  return fetchGet(
    '/clients'
  )
}