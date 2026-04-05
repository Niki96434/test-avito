export interface ItemsGetOut {
    items: {
        id: number;
        category: "auto" | "real_estate" | "electronics";
        title: string;
        price: number;
        needsRevision: boolean;
        createdAt: string;
        params: ItemParams;
        description?: string;

    }[];
    total: number;
}

export type SingleItem = ItemsGetOut['items'][number];

export interface CardsProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export interface ItemsResponse {
    data: {
        items: SingleItem[],
        total: number
    }
}

export interface FilterState {
    category: SingleItem['category'] | null,
    needsRevision: boolean,
    sortColumn: SingleItem['title'] | SingleItem['createdAt'] | null;
    sortDirection: 'asc' | 'desc' | null;
}

export interface ItemParams {
    type?: 'phone' | 'misc' | 'tablet' | 'laptop' | 'room' | 'flat' | 'house';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
    address?: string;
    area?: number;
    floor?: number;
    yearOfManufacture?: number | string;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
}

export type ItemUpdateIn = {
    category: 'auto' | 'real_estate' | 'electronics';
    title: string;
    description?: string;
    price: number;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
};

export type AutoItemParams = {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
};

export type RealEstateItemParams = {
    type?: 'flat' | 'house' | 'room';
    address?: string;
    area?: number;
    floor?: number;
};

export type ElectronicsItemParams = {
    type?: 'phone' | 'laptop' | 'misc';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
};