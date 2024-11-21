import { User } from "../entities/user.entity";

export interface UserRepository {
    createUser(user: Partial<User>): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    deactivateUser(userId: string): Promise<void>;
}