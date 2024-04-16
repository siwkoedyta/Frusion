import { fetchPost } from '../utils'

export async function addTransaction(clientId, fruitId, weightGross, boxId, numberOfBoxes) {
  return fetchPost(
    '/transactions',
    {
        userId: clientId,
        fruitId: fruitId,
        weightGross: weightGross,
        boxId: boxId,
        numberOfBoxes: numberOfBoxes
    }
  )
}

