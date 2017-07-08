/* Defines the product entity */
export interface IProduct {
    Id: number;
    productName: string;
    productCode: number;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}