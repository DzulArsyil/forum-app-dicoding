import axios from 'axios';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Membuat instance axios dengan Base URL
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  // Otomatis menyisipkan token ke header jika user sudah login
  axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  async function register({ name, email, password }) {
    const response = await axiosInstance.post('/register', { name, email, password });
    return response.data.data.user;
  }

  async function login({ email, password }) {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data.data.token;
  }

  async function getOwnProfile() {
    const response = await axiosInstance.get('/users/me');
    return response.data.data.user;
  }

  async function getAllUsers() {
    const response = await axiosInstance.get('/users');
    return response.data.data.users;
  }

  async function getAllThreads() {
    const response = await axiosInstance.get('/threads');
    return response.data.data.threads;
  }

  async function getDetailThread(id) {
    const response = await axiosInstance.get(`/threads/${id}`);
    return response.data.data.detailThread;
  }

  async function createThread({ title, body, category }) {
    const response = await axiosInstance.post('/threads', { title, body, category });
    return response.data.data.thread;
  }

  async function createComment({ threadId, content }) {
    const response = await axiosInstance.post(`/threads/${threadId}/comments`, { content });
    return response.data.data.comment;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getDetailThread,
    createThread,
    createComment,
  };
})();

export default api;
