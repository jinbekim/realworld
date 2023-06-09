export class RealWorldStorage {
  static get(key: string): any | null {
    const jsonUser = localStorage.getItem(key);
    if (jsonUser === null) {
      return null;
    }
    return JSON.parse(jsonUser);
  }

  static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
