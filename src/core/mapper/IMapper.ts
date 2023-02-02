export interface IMapper {
  toDomain<T>(rawData: Partial<any>): T;

  toDto<TConvertTo>(data, convertTo?: string | boolean): TConvertTo;

  toPersistence(domainData): any;
}
