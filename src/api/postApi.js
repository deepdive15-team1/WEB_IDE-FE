import { axiosInstance } from "./axiosInstance";

export const getOpenPosts = async (page, size) => {
  const response = await axiosInstance.get(
    `/post/open?page=${page}&size=${size}`
  );

  return response.data;
};
