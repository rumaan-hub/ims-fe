import axios from "axios";
import { getFromLocalStorage, removeFromLocalStorage } from "@/lib/utils";
import { authenticationConfig } from "@/config";

const { baseUrl } = authenticationConfig;

const interceptor = (config: any) => {
  if (config?.response?.status === 401) {
    removeFromLocalStorage('accessToken');
    window.location.replace('/');
  }
  return config;
};

const postJsonData = async (body: any, resource: string) => {
  try {
    const token = getFromLocalStorage("accessToken");

    const response = await axios.post(`${baseUrl}/${resource}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    const modifiedConfig = interceptor(response);

    return response.data;
  } catch (error) {
    console.error("Error making POST request with JSON:", error);
    interceptor(error);
    throw error;
  }
};

const putData = async (body: any, resource: string) => {
  try {
    const token = getFromLocalStorage("accessToken");

    const response = await axios.put(`${baseUrl}/${resource}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    const modifiedConfig = interceptor(response);

    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    interceptor(error);
    throw error;
  }
};

const deleteData = async (resource: string) => {
  try {
    const token = getFromLocalStorage("accessToken");

    const response = await axios.delete(`${baseUrl}/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const modifiedConfig = interceptor(response);

    return response;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    interceptor(error);
    throw error;
  }
};

const headerLessPutRequest = async (body: any, resource: string) => {
  try {
    const response = await axios.put(`${baseUrl}/${resource}`, body);

    const modifiedConfig = interceptor(response);
    return response.data;
  } catch (error) {
    console.error("Error making PUT request with JSON:", error);
    interceptor(error);
    throw error;
  }
};

const headerLessPostRequest = async (body: any, resource: string) => {
  try {
    const response = await axios.post(`${baseUrl}/${resource}`, body);
    const modifiedConfig = interceptor(response);
    return response.data;
  } catch (error) {
    console.error("Error making POST request with JSON:", error);
    interceptor(error);
    throw error;
  }
};
const headerPutRequest = async (body: any, resource: string) => {
  try {
    const token = getFromLocalStorage("accessToken");

    const response = await axios.put(`${baseUrl}/${resource}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    const modifiedConfig = interceptor(response);

    return response.data;
  } catch (error) {
    console.error("Error making PUT request with JSON:", error);
    interceptor(error);
    throw error;
  }
};

const getData = async (resource: string) => {
  try {
    const token = getFromLocalStorage("accessToken");
    const response = await axios.get(`${baseUrl}/${resource}`, {
      headers: {

        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    interceptor(response);

    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    interceptor(error);
    throw error;
  }


};

const scheduleDemoRequest = async (body: any) => {
  try {
    const response = await axios.post(`${baseUrl}/ims-demo/schedule`, body, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error scheduling demo:", error);
    throw error;
  }
};

export { headerLessPutRequest, getData, postJsonData, putData, deleteData, headerPutRequest, headerLessPostRequest, scheduleDemoRequest };
