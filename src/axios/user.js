import axios from "./axios";

export const getAllUsers = async (page, limit) => {
  try {
    const token = localStorage.getItem("token") || "";

    if (!page) page = 1;
    if (!limit) limit = 10;

    const url = `/users?page=${page}&limit=${limit}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error({ error });
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token") || "";

    const response = await axios.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error({ error });
  }
};

export const EditUser = async (id, data) => {
  try {
    const token = localStorage.getItem("token") || "";

    const response = await axios.patch(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error({ error });
  }
};
