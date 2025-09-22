import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8000/api" });

axiosInstance.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refresh = localStorage.getItem("refresh");

    if (error.response?.status === 401 && refresh && !originalRequest._retry) {
      originalRequest._retry = true; // avoid infinite loops

      try {
        const res = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          { refresh }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccess}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
