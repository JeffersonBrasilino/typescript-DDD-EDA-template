export class PickUpPointsCreatedEvent {
  dateTimeOccoured: Date;
  data: any;
  constructor(data) {
    this.data = data;
    this.dateTimeOccoured = new Date();
  }
}
