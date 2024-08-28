import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:5000/api/harvest'; // Adjust the URL if your backend is hosted elsewhere

// Create an axios instance with default settings
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const get = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to handle POST requests
export const post = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to handle PUT requests
export const put = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to handle DELETE requests
export const del = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle API errors
const handleError = (error) => {
  // You can customize the error handling as needed
  console.error('API Error:', error.response ? error.response.data : error.message);
  throw error;
};
