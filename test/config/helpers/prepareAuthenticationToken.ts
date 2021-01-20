import { getConnection } from 'typeorm';

import { User } from 'infrastructure/database/entities/User';

import { JWTTokenUtil } from '../../../src/ui/common/config/application/common/auth/utils/JWTTokenUtil';

export const prepareAuthenticationToken = async (
  email: string,
  dbName?: string
): Promise<string> => {
  const jwtTokenUtil = new JWTTokenUtil();

  const user = await getConnection(dbName)
    .getRepository<User>(User)
    .createQueryBuilder()
    .leftJoinAndSelect('User.role', 'Role')
    .where('User.email = :email', { email })
    .getOne();

  if (!user) {
    return '';
  }

  return jwtTokenUtil.generateToken(
    {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      role: user.role.name,
    },
    process.env.APP_TOKEN_SECRET || '',
    process.env.APP_TOKEN_LIFE || '',
    'user'
  );
};
