import { Auth } from "./auth.interfce";

export interface User extends Auth {
    name: string;
    description?: string; 
}