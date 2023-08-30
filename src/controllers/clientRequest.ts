import axios, { AxiosError, AxiosRequestConfig } from "axios";

function fillAxiosConfig(
  url: string,
  requestType: "GET" | "PUT" | "POST" | "DELETE",
  formData: boolean,
  paramsData: null | Record<any, any>,
  postData?: Record<string, any> | FormData
): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    baseURL: "localhost:8081",
    url: url,
    params: paramsData,
    method: requestType,
    headers: {
      "Content-Type": formData ? "multipart/form-data" : "application/json",
    },
    data: postData,
  };
  return config;
}

export function getRequest<T>(
  url: string,
  paramsData: Record<any, any> | null = null
): Promise<T> {
  return axiosRequest(url, "GET", paramsData)
    .then((response: T) => Promise.resolve(response))
    .catch((err: AxiosError) => {
      console.log(err);
      return Promise.reject(err);
    });
}

export function postRequest<T>(
  url: string,
  postData: Record<string, any>,
  paramsData: Record<any, any> | null = null,
  formData: boolean = false
): Promise<T> {
  return axiosRequest(url, "POST", paramsData, postData, formData)
    .then((res: T) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function putRequest<T>(
  url: string,
  putData: Record<string, any>,
  paramsData: Record<any, any> | null = null,
  formData: boolean = false
): Promise<T> {
  return axiosRequest(url, "PUT", paramsData, putData, formData)
    .then((res: T) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

function axiosRequest(
  url: string,
  requestType: "GET" | "PUT" | "POST" | "DELETE",
  paramsData: null | Record<any, any> = null,
  data?: Record<string, any> | FormData,
  formData = false
): Promise<any> {
  const config = fillAxiosConfig(url, requestType, formData, paramsData, data);
  return axios(config)
    .then((response) => Promise.resolve(response.data))
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
}
