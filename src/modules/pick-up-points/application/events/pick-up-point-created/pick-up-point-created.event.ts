export type props = {
  location: string;
  dateTimeOcourred: Date;
};
export class PickUpPointsCreatedEvent {
  data: props;
  constructor(props: props) {
    Object.assign(this, props);
    this.data.dateTimeOcourred = new Date();
  }
}
