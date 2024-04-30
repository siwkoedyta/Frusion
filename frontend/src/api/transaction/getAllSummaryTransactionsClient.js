import { fetchGet } from '../utils';
export async function getAllSummaryTransactionsClient(dateStart, dateEnd) {
  const isoDateStart = dateStart.toISOString().split('T')[0];
  const isoDateEnd = dateEnd.toISOString().split('T')[0];

  return fetchGet(
    `/transactionsSummary/user?startDate=${isoDateStart}&endDate=${isoDateEnd}`
  );
}