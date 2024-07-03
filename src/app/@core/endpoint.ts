import { environment } from 'src/environments/environment';

export const BASE_URL = environment.base_url;

export const Endpoint = {
  AUTH: {
    login: `${BASE_URL}/auth/login`,
  },
  USERS: {
    users: `${BASE_URL}/8be27afe-7257-4562-b362-d18c1d475862`,
    userDetails: `${BASE_URL}/user-details`,
  },
};
