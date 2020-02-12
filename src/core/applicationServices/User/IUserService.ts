import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';
import { User } from 'core/domain/User/User';
import { FetchUserRequest } from 'core/applicationServices/User/requests/FetchUserRequest';

export interface IUserService {
  fetchUser(request: FetchUserRequest): Promise<User>;
  removeUser(request: RemoveUserRequest): Promise<void>;
}
