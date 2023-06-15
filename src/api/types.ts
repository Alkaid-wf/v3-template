export interface Def {
  code: number;
  message: string;
  data?: any;
  total?: number;
}

export interface ResStr extends Def {
  data?: string;
}

export interface ResNum extends Def {
  data?: number;
}

export interface ResBool extends Def {
  data?: Boolean;
}

export interface ResObj extends Def {
  data?: Record<string, any>;
}

export interface ResArr extends Def {
  data?: Record<string, any>[];
  total?: number;
}
