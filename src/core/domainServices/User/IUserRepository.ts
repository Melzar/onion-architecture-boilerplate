import { User } from 'core/domain/User/User';
import { FindUserByEmailRequest } from 'core/domainServices/User/request/FindUserByEmailRequest';
import { FindUserRequest } from 'core/domainServices/User/request/FindUserRequest';
import { AddUserRequest } from 'core/domainServices/User/request/AddUserRequest';

export interface IUserRepository {
  addUser(request: AddUserRequest): Promise<User>;
  findUser(request: FindUserRequest): Promise<User>;
  findUserByEmail(request: FindUserByEmailRequest): Promise<User>;
}
