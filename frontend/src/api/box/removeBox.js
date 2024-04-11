import { fetchDelete } from '../utils';

export async function removeBox(boxId) {
    return fetchDelete(
        `/boxes/${boxId}`
    );
}