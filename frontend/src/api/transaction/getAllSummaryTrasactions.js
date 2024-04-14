import { fetchGet } from '../utils';
export async function getAllSummaryTrasactions(date) {
  const isoDate = date.toISOString().split('T')[0];
  return fetchGet(
    `/transactionsSummary?startDate=${isoDate}&endDate=${isoDate}`
  );
}