import { Role } from 'core/domain/Role/Role';
import { FindRoleRepositoryRequest } from 'core/domainServices/Role/request/FindRoleRepositoryRequest';
import { FindRoleByNameRepositoryRequest } from 'core/domainServices/Role/request/FindRoleByNameRepositoryRequest';

export interface IRoleRepository {
  findRole(request: FindRoleRepositoryRequest): Promise<Role>;
  findRoleByName(request: FindRoleByNameRepositoryRequest): Promise<Role>;
}
