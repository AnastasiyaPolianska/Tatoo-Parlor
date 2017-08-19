/* Defines the product entity */
export interface IQuestion {
    id: number;
    category: string;
    theme: string;
    questionName: string;
    createdBy: number;
    answer: string;
}