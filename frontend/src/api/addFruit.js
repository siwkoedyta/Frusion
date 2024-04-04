import { fetchPost } from './utils'

export async function addFruit(fruitName) {
  return fetchPost(
    '/fruits',
    {
      name: fruitName
    }
  )
}