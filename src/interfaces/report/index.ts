import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReportInterface {
  id?: string;
  title: string;
  content: string;
  analyst_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  analyst_id?: string;
}
