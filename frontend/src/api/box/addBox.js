import { fetchPost } from '../utils'

export async function addBox(name, weight) {
  return fetchPost(
    '/boxes',
    {
      name: name,
      weight: weight
    }
  )
}