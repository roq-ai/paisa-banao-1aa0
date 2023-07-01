import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface QueryInterface {
  id?: string;
  question: string;
  response?: string;
  customer_id?: string;
  support_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface QueryGetQueryInterface extends GetQueryInterface {
  id?: string;
  question?: string;
  response?: string;
  customer_id?: string;
  support_id?: string;
}
