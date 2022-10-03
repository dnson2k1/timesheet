export type ICustomer = {
  id?: number;
  name: string;
  address?: string;
  code: string;
};

export type IStateCustomer = {
  listCustomer: ICustomer[];
  error: string;
  loading: boolean;
};
