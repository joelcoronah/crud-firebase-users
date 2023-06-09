import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/users`, user);

export const loginRequest = async (uid) => axios.post(`/auth/login`, { uid });
