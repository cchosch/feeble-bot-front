export const PROD = process.env.NODE_ENV?.toLowerCase() == "production";

/**
 * multiply by u to convert from u to mm
 */
export const u = 19.05;

/**
 * size in mm of switch
 */
export const switch_size = 14;

export const fetchCookies: {credentials: RequestCredentials} = { credentials: PROD ? "same-origin" : "include" };
