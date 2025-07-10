import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Throw the error instead of just logging it
  }
};

export const createPost = async (postData, token) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
