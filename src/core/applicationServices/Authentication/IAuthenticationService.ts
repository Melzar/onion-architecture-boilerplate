export interface IAuthenticationService {

    authenticate(email: string, password: string): string | undefined; // TODO wrap into request object

    signUp(): void;

}
