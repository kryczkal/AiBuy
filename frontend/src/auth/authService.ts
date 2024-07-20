import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { UserRole } from './UserRole';

type DecodedToken = {
  exp: number;
  role: UserRole;
  sub: string;
};
export const TOKEN_KEY = 'token';
export const checkTokenValidity = (unauthorizedCallback: () => void) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    unauthorizedCallback();
    return;
  }
  const decodedToken = jwtDecode(token) as DecodedToken;

  const currentTime = Date.now() / 1000;

  if (decodedToken.exp && decodedToken.exp < currentTime) {
    localStorage.removeItem('token');
    unauthorizedCallback();
  } else {
    const timeout = decodedToken.exp * 1000 - currentTime * 1000;
    setTimeout(() => checkTokenValidity(unauthorizedCallback), timeout);
    setAuthorizationHeader(token);
  }
};

export interface LoggedInUser {
  email: string;
  role: string;
}

export const getUserFromToken = () => {
  const decodedToken = getDecodedToken();

  if (!decodedToken) {
    return;
  }

  return {
    email: decodedToken.sub,
    role: decodedToken.role,
  } as LoggedInUser;
};

const getDecodedToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return;
  }

  return jwtDecode(token) as DecodedToken;
};
export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
