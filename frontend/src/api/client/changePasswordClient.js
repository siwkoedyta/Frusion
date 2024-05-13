import { fetchPut } from '../utils';

export async function changePasswordClient(userId, currentPassword, newPassword) {
  return fetchPut(
    `/clients/${userId}/changePassword`,
    {
        currentPassword: currentPassword,
        newPassword: newPassword
    })
}