export interface Category {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
}

export interface Table {
    id: number;
    name: string;
}

export interface Reservation {
    id: number;
    userId: string;
    date: Date;
    tableId: number;
}
