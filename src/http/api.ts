import { Credentials } from './../types';
import { api } from './client';


// Auth Service

export const login = (credentials: Credentials) => api.post("/api/v1/auth/login", credentials)

export const self = () => api.get("/api/v1/auth/self")
export const logout = () => api.post("/api/v1/auth/logout")
export const allUsers = () => api.get("/api/v1/users/")