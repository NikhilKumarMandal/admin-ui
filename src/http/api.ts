import { Credentials, Tenant, UpdateUserData, UserData } from './../types';
import { api } from './client';


// Auth Service
export const AUTH_SERVICE = "/api/auth"

// Catalog-Service
export const CATALOG_SERVICE = "/api/catalog"



export const login = (credentials: Credentials) => api.post(`${AUTH_SERVICE}/api/v1/auth/login`,credentials)

export const self = () => api.get(`${AUTH_SERVICE}/api/v1/auth/self`)

export const logout = () => api.post(`${AUTH_SERVICE}/api/v1/auth/logout`)

export const allUsers = (queryString: string) => api.get(`${AUTH_SERVICE}/api/v1/users?${queryString}`);

export const allTenant = () => api.get(`${AUTH_SERVICE}/api/v1/tenant/`)

export const getTenants = (queryString: string) =>api.get(`${AUTH_SERVICE}/api/v1/tenant?${queryString}`);

export const createTenant = (tenantData: Tenant) => api.post(`${AUTH_SERVICE}/api/v1/tenant/`,tenantData)
export const createUser = (userData: UserData) => api.post(`${AUTH_SERVICE}/api/v1/users/`, userData)
export const updateUser = (user: UpdateUserData, id: string) => api.patch(`${AUTH_SERVICE}/api/v1/users/${id}`, user)


// Catalog Service

export const getCategories = () => api.get(`${CATALOG_SERVICE}/api/v1/categories/`)

export const getCategory = (id: string) => api.get(`${CATALOG_SERVICE}/categories/${id}`);

export const allProducts = (queryString: string) => api.get(`${CATALOG_SERVICE}/api/v1/products?${queryString}`)

export const getProducts = (queryParam: string) =>
    api.get(`${CATALOG_SERVICE}/products?${queryParam}`);

export const createProduct = (product: FormData) =>
    api.post(`${CATALOG_SERVICE}/products`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
});

export const updateProduct = (product: FormData, id: string) => {
    return api.put(`${CATALOG_SERVICE}/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

