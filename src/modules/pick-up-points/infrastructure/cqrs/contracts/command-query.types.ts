import { DeletePickUpPointsCommand } from '@module/pick-up-points/application/commands/delete-pick-up-points/delete-pick-up-points.command';
import { CreatePickUpPointsCommand } from '@module/pick-up-points/application/commands/create-pick-up-points/create-pick-up-points.command';
import { UpdatePickUpPointsCommand } from '@module/pick-up-points/application/commands/update-pick-up-points/update-pick-up-points.command';
import { PickUpPointsCreatedEvent } from '@module/pick-up-points/application/events/pick-up-point-created/pick-up-point-created.event';
import { GetPickUpPointsQuery } from '@module/pick-up-points/application/queries/get-pick-up-points/get-pick-up-points.query';
import { ListPickUpPointsQuery } from '@module/pick-up-points/application/queries/list-pick-up-points/list-pick-up-points.query';

export const COMMANDS = {
  create: CreatePickUpPointsCommand,
  update: UpdatePickUpPointsCommand,
  delete: DeletePickUpPointsCommand,
};
export type commandsAction = keyof typeof COMMANDS;

export const QUERIES = {
  list: ListPickUpPointsQuery,
  get: GetPickUpPointsQuery,
};
export type queriesAction = keyof typeof QUERIES;

export const EVENTS = [PickUpPointsCreatedEvent];
