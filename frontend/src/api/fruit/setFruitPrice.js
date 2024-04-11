import { fetchPut } from '../utils';

export async function setFruitPrice(fruitId, newPrice) {
    return fetchPut(
        `/fruits/${fruitId}/price`,
        {
            price: newPrice
        }
    )
}