import axiosInstance from "../utils/axiosInstance.js";
import dotenv from "dotenv";

dotenv.config();

const submitJokesBaseUrl = process.env.SUBMIT_JOKES_SERVICE_URL;
const deliverJokesBaseUrl = process.env.DELIVER_JOKES_SERVICE_URL;

export const getJokes = async () => {
  return await axiosInstance.get(`${submitJokesBaseUrl}/getAllJokes`);
};

export const getOneJoke = async (id) => {
    return await axiosInstance.get(`${submitJokesBaseUrl}/getOneJoke/${id}`);
  };

export const updateJoke = async (id, updatedData) => {
  return await axiosInstance.put(`${submitJokesBaseUrl}/update/${id}`, updatedData);
};

export const deleteJoke = async (id) => {
  return await axiosInstance.delete(`${submitJokesBaseUrl}/delete/${id}`);
};

export const addJokeToDeliver = async (newJoke) => {
  return await axiosInstance.post(`${deliverJokesBaseUrl}`, newJoke);
};

export const deleteJokeFromDeliver = async (id) => {
    return await axiosInstance.delete(`${deliverJokesBaseUrl}/delete/${id}`);
  };

