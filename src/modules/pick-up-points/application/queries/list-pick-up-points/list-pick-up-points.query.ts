export interface ListPickUpPointsQueryProps {
  perPage?: number;
  page?: number;
  latitude?: number;
  longitude?: number;
  distance?: number;
  establishment?: string;
  enable?: boolean;
}
export class ListPickUpPointsQuery {
  readonly perPage: number;
  readonly page: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly distance: number;
  readonly establishment: string;
  readonly enable: boolean;
  constructor(props: ListPickUpPointsQueryProps) {
    Object.assign(this, props);
  }
}
