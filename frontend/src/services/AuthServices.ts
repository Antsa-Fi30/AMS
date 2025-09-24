import axios from "axios";

export interface AuthData {
  phone_number: string;
  password: string | null;
}

export interface RegisterData {
  phone_number: string;
  name: string | null;
  email: string | null;
  role: string | null;
  password1: string | null;
  password2: string | null;
}

const apiUrl = import.meta.env.VITE_LOCAL_URL;

export const authenticate = async (data: AuthData) => {
  try {
    const response = await axios.post(`${apiUrl}login/`, data);
    return response.data;
  } catch (error) {
    let errorMessage = "Authentication failed";
    if (error instanceof Error) {
      errorMessage += " : " + error.message;
    }
    throw new Error(errorMessage);
  }
};

export const signIn = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${apiUrl}register/`, data);
    return response.data;
  } catch (err) {
    let errorMessage = "Registration failed";
    if (err instanceof Error) {
      errorMessage += " : " + err.message;
    }
    throw new Error(errorMessage);
  }
};

export const logout = async (token: string | null) => {
  try {
    const response = await axios.post(`${apiUrl}logout/`, { refresh: token });
    return response.data;
  } catch (err) {
    let errorMessage = "Logging out failed";
    if (err instanceof Error) {
      errorMessage += " : " + err.message;
    }
    throw new Error(errorMessage);
  }
};
