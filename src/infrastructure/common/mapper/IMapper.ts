import { Mapper } from '@wufe/mapper';

export interface IMapper {
  configureMappings(mapper: Mapper): void;
}
