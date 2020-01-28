import { AuthenticationRequest } from 'core/common/requests/AuthenticationRequest';
import { User } from 'core/domain/User/User';

export interface IAuthenticationService {
  verifyCredentials(request: AuthenticationRequest): Promise<User | undefined>;

  signUp(): void;
}
