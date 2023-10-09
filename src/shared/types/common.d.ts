type Email = string;
type Name = string;
type UniqueId = string;
type Url = string;
type Password = string;
type Token = string;
type Text = string;

type RequiredAtLeastOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[Keys];

interface Pagination {
  offset?: number;
  limit?: number;
}
