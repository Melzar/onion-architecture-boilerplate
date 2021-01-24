import { GetRateRepositoryRequest } from 'core/domainServices/Rate/request/GetRateRepositoryRequest';
import { Rate } from 'core/domain/Rate/Rate';

export interface IRateRepository {
  getRate(request: GetRateRepositoryRequest): Promise<Rate>;
  getRates(): Promise<Rate[]>;
}
