/**
 * @example {"errors":{"email or password":["is invalid"]}}
 */
export interface RealError {
  errors: Record<string, string[]>;
}
