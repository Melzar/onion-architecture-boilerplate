import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Rate as RateEntity } from 'infrastructure/database/entities/Rate';
import { Repository } from 'infrastructure/database/repository/common/Repository';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';

import { IRateRepository } from 'core/domainServices/Rate/IRateRepository';
import { Rate } from 'core/domain/Rate/Rate';
import { GetRateRepositoryRequest } from 'core/domainServices/Rate/request/GetRateRepositoryRequest';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { BaseError } from 'core/common/errors/BaseError';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';

@injectable()
@EntityRepository(RateEntity)
export class RateRepository extends Repository<RateEntity>
  implements IRateRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(RateEntity);
  }

  async getRate({ id }: GetRateRepositoryRequest) {
    const rate = await this.find(id);

    if (!rate)
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.RATE_NOT_FOUND]
      );

    return this.dbMapper.mapper.map<RateEntity, Rate>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.RATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.RATE_ENTITY,
      },
      rate
    );
  }

  async getRates() {
    const rates = await this.findAll();

    return this.dbMapper.mapper.map<RateEntity[], Rate[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.RATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.RATE_ENTITY,
      },
      rates
    );
  }
}
