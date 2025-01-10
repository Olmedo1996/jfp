export interface IResponseApiListViewGet<TData> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData[];
}
