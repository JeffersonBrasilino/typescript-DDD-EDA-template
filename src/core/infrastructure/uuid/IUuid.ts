export interface IUuId {
  generate(): string;

  isValid(uuid: string): boolean;
}
