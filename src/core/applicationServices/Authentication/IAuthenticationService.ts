import { AuthenticationRequest } from 'core/domain/Authentication/AuthenticationRequest';
import { User } from 'core/domain/User';

export interface IAuthenticationService {
  verifyCredentials(request: AuthenticationRequest): Promise<User | undefined>;

  signUp(): void;
}
