declare function GM_deleteValue(key: string): void;

declare function GM_getValue(key: string): string;

declare function GM_listValues(): string[];

declare function GM_setValue(key: string, value: string): void;

class GM_Storage {
  getItem(key: string): string | null {
    return GM_getValue(key);
  }

  listItems(): string[] {
    return GM_listValues();
  }

  removeItem(key: string): void {
    GM_deleteValue(key);
  }

  setItem(key: string, value: string): void {
    GM_setValue(key, value);
  }
}

export const gm_storage = new GM_Storage();
