'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

const serverAxios = axios.create({
  baseURL: process.env.API_URL,
});


serverAxios.interceptors.request.use(async (config) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default serverAxios;
