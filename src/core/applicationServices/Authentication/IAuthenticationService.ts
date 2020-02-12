import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { User } from 'core/domain/User/User';
import { SignUpRequest } from 'core/applicationServices/Authentication/requests/SignUpRequest';

export interface IAuthenticationService {
  signUp(request: SignUpRequest): Promise<User>;
  verifyCredentials(request: AuthenticationRequest): Promise<User | undefined>;
}
