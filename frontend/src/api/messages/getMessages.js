import { fetchGet } from '../utils';

export async function getMessages() {
  return fetchGet(
    '/api/messages'
  )
}