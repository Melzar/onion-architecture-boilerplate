import { User } from 'core/domain/User/User';
import { FindUserByEmailRequest } from 'core/domainServices/User/request/FindUserByEmailRequest';
import { FindUserRequest } from 'core/domainServices/User/request/FindUserRequest';
import { AddUserRequest } from 'core/domainServices/User/request/AddUserRequest';
import { DeleteUserRequest } from 'core/domainServices/User/request/DeleteUserRequest';

export interface IUserRepository {
  addUser(request: AddUserRequest): Promise<void>;
  deleteUser(request: DeleteUserRequest): Promise<void>;
  findUser(request: FindUserRequest): Promise<User | undefined>;
  findUserByEmail(request: FindUserByEmailRequest): Promise<User>;
}
