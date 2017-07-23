/* Defines the product entity */
export interface IProduct {
    id: number;
    productName: string;
    amountLeft: number;
    amount?: number;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}