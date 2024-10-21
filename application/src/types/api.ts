export type CheckNameResponse = {
  available: boolean;
};

export type StrapiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    details: Record<string, unknown>;
    message: string;
    name: string;
    status: number;
  };
};

export type ErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
};
