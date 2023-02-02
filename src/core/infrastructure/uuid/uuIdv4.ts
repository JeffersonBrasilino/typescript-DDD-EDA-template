import { v4, validate } from 'uuid';
import { IUuId } from './IUuid';
export class UuIdV4 implements IUuId {
  generate(): string {
    return v4();
  }

  isValid(uuid: string): boolean {
    return validate(uuid);
  }
}
