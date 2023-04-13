type RequiredAtLeastOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[Keys];

interface GenericError {
  errors: {
    body: string[];
  };
}

interface Pagination {
  offset: number;
  limit: number;
}
