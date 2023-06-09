import axios from "axios";

const API_URL = import.meta.env.VITE_MEILISEARCH_SERVER_URL || "";

const instance = axios.create({
  baseURL: API_URL,
  Accept: "*/*",
});

export const getAllProducts = async () => {
  try {
    const token = import.meta.env.VITE_MEILISEARCH_APIKEY || "";

    console.log({ token });

    const response = await instance.get(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error({ error });
  }
};
