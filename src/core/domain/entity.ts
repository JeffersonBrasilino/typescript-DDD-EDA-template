import { UuIdV4 } from '../infrastructure/uuid/uuIdv4';

export type EntityProps = {
  uuid?: string;
};
/**
 * classe reveladora de intenção da entidade.
 * toda entidade de domino deve estender essa classe, serve para identificar um domain entity.
 */
export abstract class Entity {
  readonly uuid;

  constructor(uuid?: string) {
    this.uuid = uuid ?? new UuIdV4().generate();
  }
}
