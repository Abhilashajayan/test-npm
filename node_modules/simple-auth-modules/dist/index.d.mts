import { Document } from 'mongoose';

type ConnectionURI = string;
declare const dbConnection: (connectionString: ConnectionURI) => Promise<void>;

interface IUser$1 {
    username: string;
    email: string;
    password: string;
}
interface IUserModel extends IUser$1, Document {
}

interface IUser {
    username: string;
    email: string;
    password: string;
}
declare const registerUser: (userData: IUser) => Promise<IUserModel>;
declare const loginUser: (username: string, password: string, secretKey: string) => Promise<string | null>;
declare const verifyToken: (token: string, secretKey: string) => {
    userId: string;
    username: string;
    email: string;
} | null;

export { dbConnection, loginUser, registerUser, verifyToken };
