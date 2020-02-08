import { interfaces } from 'inversify-express-utils';

import { User } from 'ui/common/models/User';

export class Principal implements interfaces.Principal {
  public details: User | undefined;

  public constructor(details: User | undefined) {
    this.details = details;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }

  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(resourceId === true);
  }

  public isInRole(role: string): Promise<boolean> {
    return Promise.resolve(role === this.details?.role);
  }
}
