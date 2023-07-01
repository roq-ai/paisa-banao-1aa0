const mapping: Record<string, string> = {
  customers: 'customer',
  firms: 'firm',
  queries: 'query',
  reports: 'report',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
