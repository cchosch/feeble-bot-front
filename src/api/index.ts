import { PROD, fetchCookies } from "../util/consts";
import { ApiResponse } from "./api.types";

export const url = (path: string, params?: {[key: string]: string})=>{
    // remove all slashes at end of path
    path = path.trim().replace(/(\/)*$/, "");
    const strParams = params ? Object.entries(params).reduce((prev, v, i)=>{
        return prev+(i === 0 ? "?" : "&")+`${v[0]}=${v[1]}`;
    }, "") : "";

    if(PROD)
        return path+strParams;

    return `${window.location.protocol}//${window.location.hostname}:80/api/v1`+path.start(1, "/")+strParams;
};

interface CustomRequestInit extends Omit<RequestInit, "body"> {
    body?: any | BodyInit | null,
    isReconnect?: boolean
}

export const unwrapApiResponse = <T>(val: ApiResponse<T>): T | null => {
    if(val && typeof val === "object" && "error_msg" in val) {
        return null;
    }
    return val as T;
};

export const fetchApi = async (path: string, reqOpts?: CustomRequestInit, useCookies=true): Promise<Response> => {
    const JSONBody = reqOpts ? typeof reqOpts.body !== "string" : false;
    const method = reqOpts?.method??"get";
    apiLogger({data: reqOpts?.body, path, method, message: "Sending request", type: "info"});
    try {
        const resp = await fetch(url(path), {
            ...(reqOpts ?? {}),
            ...(useCookies ? fetchCookies : {}),
            body: reqOpts?.body ? (JSONBody ? JSON.stringify(reqOpts.body) : reqOpts.body) : undefined,
            headers: {
                ...(JSONBody ? {"content-type": "application/json"} : {}),
                ...(reqOpts ? reqOpts.headers : {})
            }
        });
        if(!PROD) {
            if(!resp.ok) {
                let errorMsg: LogMessage = {message: `Status Code ${resp.status}: ${resp.statusText}`, method, path, type: "error"};
                if(resp.headers.get("content-type") === "application/json") {
                    const jsonResp = await resp.clone().json();
                    if("error" in await jsonResp)
                        errorMsg = {message: jsonResp["error"], method, path, data: jsonResp, type: "error"};
                }
                apiLogger(errorMsg);
                
            } else if(resp.headers.get("content-type") === "application/json") {
                const jsonResp = await resp.clone().json();
                apiLogger({data: jsonResp, method, path, type: "success"});
            }
        }

        return resp;
    } catch(e) {
        if(e instanceof Error) {
            apiLogger({message: e.message, method, type: "error", path});

        } else {
            console.debug(e);
        }
        throw e;
    }
};

interface LogMessage {
    data?: object
    path: string,
    method: string,
    message?: string
    type: "success" | "error" | "info"
}
  
function apiLogger({
    data,
    path,
    message,
    method,
    type,
}: LogMessage) {
  if (PROD)
    return;
  if(!message) {
    if(type === "success")
        message = "Successful request";
  }
  
  console.debug(`%c--Request Debugger-- %c[${method.toUpperCase()} ${type.toUpperCase()}]${message ? " " : ""}${message} %c${path}`, "color: #818181", getTitleColor(type), "color: white");
  if(data)
    console.debug(data);
}

function getTitleColor(logType?: "success" | "error" | "info") {
    if (logType === "error") {
        return "color: #d93e3e;";
    }

    if (logType === "info") {
        return "color: white;";
    }

    return "color: #548a54;";
}


export const fetchApiJson = async <T=any>(path: string, reqOpts?: CustomRequestInit, useCookies?: boolean): Promise<ApiResponse<T>> => {
    const resp = await fetchApi(path, reqOpts, useCookies);
    const status = resp.status;
    return {...(await resp.json() as ApiResponse<T>), status};
};