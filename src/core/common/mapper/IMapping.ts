import { Mapper } from '@wufe/mapper';

export interface IMapping {
  configureMapping(mapper: Mapper): void;
}
