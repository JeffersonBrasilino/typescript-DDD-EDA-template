export interface GetPickUpPointsQueryProps {
  uuid: string;
}
export class GetPickUpPointsQuery {
  uuid: string;
  constructor(props: GetPickUpPointsQueryProps) {
    Object.assign(this, props);
  }
}
