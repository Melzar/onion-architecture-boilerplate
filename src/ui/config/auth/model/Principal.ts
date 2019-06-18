import { interfaces } from 'inversify-express-utils';

import { User } from 'core/domain/User'; // TODO It would be better to have separate ui models and map them from domain

export class Principal implements interfaces.Principal {
    public details: User;

    public constructor(details: any) {
      this.details = details;
    }

    public isAuthenticated(): Promise<boolean> {
      return Promise.resolve(!!this.details);
    }

    public isResourceOwner(resourceId: any): Promise<boolean> {
      return Promise.resolve(resourceId === true);
    }

    public isInRole(role: string): Promise<boolean> {
      return Promise.resolve(role === this.details.role);
    }
}
