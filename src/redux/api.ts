// Wrapper for HTTP requests with Axios
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081",
// });

// // Add an interceptor for all requests
// api.interceptors.request.use((config) => {
//   // Retrieve the access token from React state or a state management system
//   const token: string | null = localStorage.getItem("tokenData");
//   const tokenData = token ? JSON.parse(token) : null;
//   const accessToken = tokenData;

//   // Add the access token to the Authorization header
//   config.headers.Authorization = `Bearer ${accessToken}`;

//   return config;
// });

// export default api;

const getAuthHeader = () => {
  const token: string | null = localStorage.getItem("tokenData");
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = token ? JSON.parse(token) : null;
  if (user!=null) {
      return {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
      };
  } else {
      return {
          'Content-Type': 'application/json',
      };
  }
};

export default getAuthHeader;
