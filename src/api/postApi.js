import { axiosInstance } from "./axiosInstance";

export const getOpenPosts = async (page, size) => {
  const response = await axiosInstance.get(
    `/posts/open?page=${page}&size=${size}`
  );

  return response.data;
};

export const createPost = async (requestBody) => {
  const response = await axiosInstance.post("/posts", requestBody);

  return response.data;
};
