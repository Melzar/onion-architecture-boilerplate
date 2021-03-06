import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';
import { Rate } from 'core/domain/Rate/Rate';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Rate as RateEntity } from 'infrastructure/database/entities/Rate';

export const RateEntityToRateDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<RateEntity, Rate>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.RATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.RATE_ENTITY,
      },
      Rate
    );
  },
});
