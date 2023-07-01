import { QueryInterface } from 'interfaces/query';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  name: string;
  email: string;
  sales_rep_id?: string;
  created_at?: any;
  updated_at?: any;
  query?: QueryInterface[];
  user?: UserInterface;
  _count?: {
    query?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  email?: string;
  sales_rep_id?: string;
}
