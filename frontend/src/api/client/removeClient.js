import { fetchDelete } from '../utils';

export async function removeClient(clientId) {
    return fetchDelete(
        `/clients/${clientId}`
    );
}