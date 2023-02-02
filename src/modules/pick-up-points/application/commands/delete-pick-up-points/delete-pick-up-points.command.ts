export type DeletePickUpPointsCommandProps = {
  uuid: string;
};
export class DeletePickUpPointsCommand {
  readonly uuid: string;

  constructor(props: DeletePickUpPointsCommandProps) {
    Object.assign(this, props);
  }
}
