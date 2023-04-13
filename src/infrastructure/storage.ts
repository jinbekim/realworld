export class RealWorldStorage {
  static get(key: string): any | null {
    return JSON.parse(localStorage.getItem(key) ?? "");
  }

  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
