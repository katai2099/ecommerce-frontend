import axios, { AxiosError, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { API_ENDPOINT, API_PORT } from "../model/constant";
import { prepareFormData } from "./utils";

interface RequestOptions {
  auth?: boolean;
  requestParams?: Record<string, any> | null | string;
  formData?: boolean;
}

function fillAxiosConfig(
  url: string,
  requestType: "GET" | "PUT" | "POST" | "DELETE",
  data?: Record<string, any> | FormData,
  options: RequestOptions = {}
): AxiosRequestConfig {
  const { auth = false, requestParams = false, formData = false } = options;

  if (formData) {
  }
  const config: AxiosRequestConfig = {
    baseURL: `http://${API_ENDPOINT}:${API_PORT}/api`,
    url,
    params: requestParams,
    method: requestType,
    headers: {
      "Content-Type": formData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${auth ? localStorage.getItem("jwt") : ""}`,
    },
  };

  if (formData) {
    const form = prepareFormData(data!);
    config.data = form;
  } else {
    config.data = data;
  }
  return config;
}

function axiosRequest<T>(
  url: string,
  requestType: "GET" | "PUT" | "POST" | "DELETE",
  data?: Record<string, any> | FormData,
  options: RequestOptions = {}
): Promise<T> {
  const config = fillAxiosConfig(url, requestType, data, options);
  return axios(config)
    .then((response) => Promise.resolve(response.data))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function getRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  return axiosRequest<T>(url, "GET", undefined, options)
    .then((response) => Promise.resolve(response))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function postRequest<T>(
  url: string,
  postData: Record<string, any>,
  options: RequestOptions = {}
): Promise<T> {
  return axiosRequest<T>(url, "POST", postData, options)
    .then((res) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function putRequest<T>(
  url: string,
  putData: Record<string, any>,
  options: RequestOptions = {}
): Promise<T> {
  return axiosRequest<T>(url, "PUT", putData, options)
    .then((res) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}

export function deleteRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  return axiosRequest<T>(url, "DELETE", undefined, options)
    .then((res) => Promise.resolve(res))
    .catch((err: AxiosError) => Promise.reject(err));
}
