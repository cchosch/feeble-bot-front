import { fetchApi, fetchApiJson, unwrapApiResponse } from ".";
import { User } from "../store/user";
import { ApiResponse } from "./api.types";

export const fetchMe = async (): Promise<ApiResponse<User> | undefined> => {
    try {
        const u = await fetchApiJson<User>("/me");

        return u as User;
    } catch(e) {
        return undefined;
    }
};

/**
 *
 * @param username user's username
 * @param password user's password
 * @throws {Error} any error relating to networking or json
 * @returns {Promise<ApiResponse<User>>} api request result
 */
export const login = async (username: string, password: string): Promise<User | null | undefined> => {
    try {
        return unwrapApiResponse(await fetchApiJson<User>("/login", {
            method: "POST",
            body: {username, password}
        }));
    } catch(e) {
        return undefined;
    }
};

export const logout = async () =>{
    try {
        await fetchApi("/logout", {method: "DELETE"});
    } catch(e) {
    }
};