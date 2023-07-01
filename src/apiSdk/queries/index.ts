import axios from 'axios';
import queryString from 'query-string';
import { QueryInterface, QueryGetQueryInterface } from 'interfaces/query';
import { GetQueryInterface } from '../../interfaces';

export const getQueries = async (query?: QueryGetQueryInterface) => {
  const response = await axios.get(`/api/queries${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createQuery = async (query: QueryInterface) => {
  const response = await axios.post('/api/queries', query);
  return response.data;
};

export const updateQueryById = async (id: string, query: QueryInterface) => {
  const response = await axios.put(`/api/queries/${id}`, query);
  return response.data;
};

export const getQueryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/queries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQueryById = async (id: string) => {
  const response = await axios.delete(`/api/queries/${id}`);
  return response.data;
};
