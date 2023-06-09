import axios from "./axios";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token") || "";

    const response = await axios.get(`/users`, {
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
