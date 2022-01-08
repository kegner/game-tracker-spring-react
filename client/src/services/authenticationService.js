import axios from "axios"

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/v1/users/current-user");
    return response.data;
  } catch (e) {
    return null;
  }
}