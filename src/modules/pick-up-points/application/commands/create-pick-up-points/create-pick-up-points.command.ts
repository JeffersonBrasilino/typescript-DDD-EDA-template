type locationProps = {
  type: 'Point' | 'Other';
  coordinates: number[];
};
export type CreatePickUpPointsCommandProps = {
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
class PickUpPointsFactory {
  readonly establishment: string;
  readonly address: string;
  readonly number: string;
  readonly state: string;
  readonly zipCode: string;
  readonly region: string;
  readonly location: locationProps;
  readonly enable?: boolean;

  constructor(props: CreatePickUpPointsCommandProps) {
    Object.assign(this, props);
  }
}
export class CreatePickUpPointsCommand {
  readonly data: PickUpPointsFactory[] = [];

  constructor(props: CreatePickUpPointsCommandProps[]) {
    props.map((p) => {
      this.data.push(new PickUpPointsFactory(p));
    });
  }
}
