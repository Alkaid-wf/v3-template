export interface Dict {
  id: any;
  name?: string;
  [key: string]: any;
}

export type DictCollection = Record<string, Dict[]>;
