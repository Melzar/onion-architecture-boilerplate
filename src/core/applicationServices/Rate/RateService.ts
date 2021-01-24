import { inject, injectable } from 'inversify';

import { IRateRepository } from 'core/domainServices/Rate/IRateRepository';
import { IRateService } from 'core/applicationServices/Rate/IRateService';
import { FetchRateRequest } from 'core/applicationServices/Rate/requests/FetchRateRequest';
import { GetRateRepositoryRequest } from 'core/domainServices/Rate/request/GetRateRepositoryRequest';
import { Rate } from 'core/domain/Rate/Rate';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
export class RateService implements IRateService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.RATE_REPOSITORY)
    private readonly rateRepository: IRateRepository
  ) {}

  fetchRate({ id }: FetchRateRequest): Promise<Rate> {
    return this.rateRepository.getRate(new GetRateRepositoryRequest(id));
  }

  fetchRates(): Promise<Rate[]> {
    return this.rateRepository.getRates();
  }
}
