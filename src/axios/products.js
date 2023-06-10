import axios from "axios";

const API_URL = `https://meiliqa.talo.cl/indexes/maestra/search?q=`;

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
