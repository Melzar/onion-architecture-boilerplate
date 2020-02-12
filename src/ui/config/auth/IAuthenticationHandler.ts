import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { Authentication } from 'ui/config/auth/models/Authentication';

export interface IAuthenticationHandler {
  authenticate(request: AuthenticationRequest): Promise<Authentication>;
}
