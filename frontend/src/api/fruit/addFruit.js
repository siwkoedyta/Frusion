import { fetchPost } from '../utils'

export async function addFruit(name, weight) {
  return fetchPost(
    '/fruits',
    {
      name: name,
      weight: weight
    }
  )
}