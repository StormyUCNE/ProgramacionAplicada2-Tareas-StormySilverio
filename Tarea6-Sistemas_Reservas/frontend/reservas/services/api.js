import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
export const URL_API = Constants.expoConfig?.extra.apiUrl;
export const request = async (path, options = {}) => {
  const { method = "GET", auth = false, body } = options;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (auth) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const response = await fetch(`${URL_API}${path}`, {
      method: method,
      headers: headers,
      ...(body !== undefined && {
        body: JSON.stringify(body)
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {return error}
};