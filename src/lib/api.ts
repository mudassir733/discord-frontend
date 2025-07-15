// base url
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// end points
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const GET_USER_BY_ID_ENDPOINT = `${API_BASE_URL}/users/me/:id`;
export const INITIATE_PASSWORD_ENDPOINT = `${API_BASE_URL}/password/initiate-reset`;
export const VERIFY_RESET_TOKEN_ENDPOINT = `${API_BASE_URL}/password/verify-token`;
export const RESET_PASSWORD_ENDPOINT = `${API_BASE_URL}/password/reset-password`;