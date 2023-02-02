export interface ListPickUpPointsResponseDto {
  establishment: string;
  address: string;
  number: string;
  state: string;
  zipCode: string;
  region: string;
  uuid: string;
  location: Partial<any>;
  distance: number | string;
}
