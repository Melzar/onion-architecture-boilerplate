import { User } from 'core/domain/User/User';
import { AddUserUnitOfWorkRepositoryRequest } from 'core/domainServices/User/request/AddUserUnitOfWorkRepositoryRequest';
import { DeleteUserUnitOfWorkRepositoryRequest } from 'core/domainServices/User/request/DeleteUserUnitOfWorkRepositoryRequest';

export interface IUserUnitOfWork {
  addUser(request: AddUserUnitOfWorkRepositoryRequest): Promise<User>;
  deleteUser(request: DeleteUserUnitOfWorkRepositoryRequest): Promise<void>;
}
