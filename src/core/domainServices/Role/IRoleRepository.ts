import { Role } from 'core/domain/Role/Role';
import { FindRoleRequest } from 'core/domainServices/Role/request/FindRoleRequest';
import { FindRoleByNameRequest } from 'core/domainServices/Role/request/FindRoleByNameRequest';

export interface IRoleRepository {
  findRole(request: FindRoleRequest): Promise<Role>;
  findRoleByName(request: FindRoleByNameRequest): Promise<Role>;
}
