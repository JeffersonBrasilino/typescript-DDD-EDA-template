type locationProps = {
  type: 'Point' | 'Other';
  coordinates: number[];
};
export type UpdatePickUpPointsCommandProps = {
  uuid: string;
  establishment: string;
  address: string;
  number: string;
  state: string;
  zipCode: string;
  region: string;
  location: locationProps;
  distance?: string;
  enable?: boolean;
};
export class UpdatePickUpPointsCommand {
  readonly uuid: string;
  readonly establishment: string;
  readonly address: string;
  readonly number: string;
  readonly state: string;
  readonly zipCode: string;
  readonly region: string;
  readonly location: locationProps;
  readonly enable?: boolean;

  constructor(props: UpdatePickUpPointsCommandProps) {
    Object.assign(this, props);
  }
}
