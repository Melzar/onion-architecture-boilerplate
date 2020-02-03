import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';

export interface IUserService {
  removeUser(request: RemoveUserRequest): Promise<void>;
}
