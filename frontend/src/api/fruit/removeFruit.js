import { fetchDelete } from '../utils';

export async function removeFruit(fruitId) {
    return fetchDelete(
        `/fruits/${fruitId}`
    );
}