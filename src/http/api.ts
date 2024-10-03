import { Credentials, Tenant, UpdateUserData, UserData } from './../types';
import { api } from './client';


// Auth Service
export const AUTH_SERVICE = "/api/auth"


export const login = (credentials: Credentials) => api.post(`${AUTH_SERVICE}/api/v1/auth/login`,credentials)

export const self = () => api.get(`${AUTH_SERVICE}/api/v1/auth/self`)

export const logout = () => api.post(`${AUTH_SERVICE}/api/v1/auth/logout`)

export const allUsers = (queryString: string) => api.get(`${AUTH_SERVICE}/api/v1/users?${queryString}`);

export const allTenant = () => api.get(`${AUTH_SERVICE},/api/v1/tenant/`)
export const createTenant = (tenantData: Tenant) => api.post(`${AUTH_SERVICE}/api/v1/tenant/`,tenantData)
export const createUser = (userData: UserData) => api.post(`${AUTH_SERVICE}/api/v1/users/`, userData)
export const updateUser = (user: UpdateUserData, id: string) => api.patch(`${AUTH_SERVICE}/api/v1/users/${id}`, user)


