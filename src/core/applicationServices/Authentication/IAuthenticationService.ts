import { AuthenticationRequest } from 'core/domain/Authentication/AuthenticationRequest';
import { Authentication } from 'core/domain/Authentication/Authentication';

export interface IAuthenticationService {

    authenticate(request: AuthenticationRequest): Promise<Authentication | undefined>;

    signUp(): void;

}
