export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
export const REGISTER_ENDPOINT = `${API_BASE_URL}/users/register`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/users/login`;
export const INITIATE_PASSWORD_ENDPOINT = `${API_BASE_URL}/password/initiate-reset`;
export const VERIFY_RESET_TOKEN_ENDPOINT = `${API_BASE_URL}/password/verify-token`;
export const RESET_PASSWORD_ENDPOINT = `${API_BASE_URL}/password/reset-password`;