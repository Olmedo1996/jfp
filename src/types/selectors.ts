export interface IGenericSelector {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

export interface Result {
  value: number;
  label: string;
}
