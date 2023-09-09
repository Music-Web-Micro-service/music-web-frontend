const devBaseUrl = "https://localhost:3370";
const proBaseUrl = "http:CHANGE_ME:3370";
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;
export const TIMEOUT: number = 5000;
