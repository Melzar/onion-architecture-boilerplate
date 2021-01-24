import { Rate } from 'core/domain/Rate/Rate';
import { FetchRateRequest } from 'core/applicationServices/Rate/requests/FetchRateRequest';

export interface IRateService {
  fetchRate(request: FetchRateRequest): Promise<Rate>;
  fetchRates(): Promise<Rate[]>;
}
