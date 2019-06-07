import { User } from 'core/domain/User';

export interface IUserRepository {
    findUser(id: string): Promise<User | undefined>;
    findUserByEmail(email: string): Promise<User[] | undefined>;
    addUser(user: User): Promise<boolean>;
}
