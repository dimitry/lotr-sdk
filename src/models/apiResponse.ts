export interface APIResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
}
