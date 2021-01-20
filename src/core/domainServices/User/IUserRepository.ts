import { User } from 'core/domain/User/User';
import { FindUserByEmailRepositoryRequest } from 'core/domainServices/User/request/FindUserByEmailRepositoryRequest';
import { FindUserRepositoryRequest } from 'core/domainServices/User/request/FindUserRepositoryRequest';
import { AddUserRepositoryRequest } from 'core/domainServices/User/request/AddUserRepositoryRequest';

export interface IUserRepository {
  addUser(request: AddUserRepositoryRequest): Promise<User>;
  findUser(request: FindUserRepositoryRequest): Promise<User>;
  findUserByEmail(request: FindUserByEmailRepositoryRequest): Promise<User>;
  getUsers(): Promise<User[]>;
}
