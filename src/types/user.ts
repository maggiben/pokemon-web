export type Languages = 'english' | 'japanese' | 'chinese' | 'french';

export interface IUser {
    username: string;
    email: string;
    language: Languages;
    token: string;
}