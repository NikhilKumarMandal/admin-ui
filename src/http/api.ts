import { Credentials } from './../types';
import { api } from './client';


// Auth Service

export const login = (credentials: Credentials) => api.post("/api/v1/auth/login",credentials)