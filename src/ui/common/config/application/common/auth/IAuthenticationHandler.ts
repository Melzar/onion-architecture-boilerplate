import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { Authentication } from 'ui/common/config/application/common/auth/models/Authentication';

export interface IAuthenticationHandler {
  authenticate(request: AuthenticationRequest): Promise<Authentication>;
}
