import { User } from 'core/domain/User/User';
import { AddUserUnitOfWorkRequest } from 'core/domainServices/User/request/AddUserUnitOfWorkRequest';
import { DeleteUserUnitOfWorkRequest } from 'core/domainServices/User/request/DeleteUserUnitOfWorkRequest';

export interface IUserUnitOfWork {
  addUser(request: AddUserUnitOfWorkRequest): Promise<User>;
  deleteUser(request: DeleteUserUnitOfWorkRequest): Promise<void>;
}
