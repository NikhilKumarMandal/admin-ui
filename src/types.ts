
export type Credentials = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    role: string
    tenant: Tenant | null;
}


export type Tenant = {
    id: number;
    name: string;
    address: string;
};


export interface UserData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  tenantId: number
}


export type FieldData = {
    name: string[];
    value?: string;
}


export type UpdateUserData = {
    firstName: string
    lastName: string
    role: string
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export type ProductAttribute = {
    name: string;
    value: string | boolean;
};

export type Products = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: Category;
    priceConfiguration: PriceConfiguration;
    attributes: ProductAttribute[];
    isPublish: boolean;
    createdAt: string;
};