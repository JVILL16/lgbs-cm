import { Roles } from './Roles';

export interface Users {
    id: number;
    account_id: number;
    roles: Roles[];
    verified: boolean;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    date_created: Date;
    date_updated: Date;
}