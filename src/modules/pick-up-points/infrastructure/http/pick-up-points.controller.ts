import { ICommandQueryFactory } from '@core/infrastructure/cqrs/ICommand-query-factory';
import { HttpResponse, HttpResponseProps } from '@core/infrastructure/http/http-response';
import { LocationValueObjectError } from '@module/pick-up-points/application/commands/create-pick-up-points/create-pick-points.command.errors';
import { CreatePickUpPointsCommandProps } from '@module/pick-up-points/application/commands/create-pick-up-points/create-pick-up-points.command';
import { UpdatePickUpPointsCommandProps } from '@module/pick-up-points/application/commands/update-pick-up-points/update-pick-up-points.command';
import { ListPickUpPointsQueryProps } from '@module/pick-up-points/application/queries/list-pick-up-points/list-pick-up-points.query';
import { Body, Controller, Delete, Get, Inject, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { commandsAction, queriesAction } from '../cqrs/contracts/command-query.types';
import { CreatePickUpPointsRequestDto } from './dtos/requests/create-pick-up-points-request.dto';
import { ListPickUpPointsRequestDto } from './dtos/requests/list-pick-up-points.request.dto';
import { UpdatePickUpPointsRequestDto } from './dtos/requests/update-pick-up-points-request.dto';

const controllerName = 'pick-up-points';
@ApiTags(controllerName)
@Controller(controllerName)
export class PickUpPointsController {
  constructor(
    private cb: CommandBus,
    private queryBus: QueryBus,
    @Inject('PickUpPointsCommandFactory') private commandFactory: ICommandQueryFactory<commandsAction>,
    @Inject('PickUpPointsQueryFactory') private queryFactory: ICommandQueryFactory<queriesAction>,
  ) {}
  @Post()
  @ApiBody({ type: CreatePickUpPointsRequestDto, isArray: true })
  async save(
    @Body(new ParseArrayPipe({ items: CreatePickUpPointsRequestDto })) dataArray: CreatePickUpPointsRequestDto[],
  ): Promise<HttpResponseProps> {
    const props: CreatePickUpPointsCommandProps[] = dataArray;
    const command = this.commandFactory.create('create', props);
    const result = await this.cb.execute(command);
    if (result.isError) {
      switch (result.constructor) {
        case LocationValueObjectError:
          return HttpResponse.badRequest(result.getError());
        default:
          return HttpResponse.internalServerError(result.getError());
      }
    }
    return HttpResponse.created<void>();
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() data: UpdatePickUpPointsRequestDto): Promise<HttpResponseProps> {
    const props: UpdatePickUpPointsCommandProps = { ...data, uuid };

    const command = this.commandFactory.create('update', props);
    const result = await this.cb.execute(command);
    if (result.isError) {
      switch (result.constructor.name) {
        case 'InvalidDomainData':
          return HttpResponse.badRequest(result.getError());
        default:
          return HttpResponse.internalServerError(result.getError());
      }
    }
    return HttpResponse.noContent<void>();
  }

  @Get()
  async list(@Query() filters: ListPickUpPointsRequestDto): Promise<any> {
    const props: ListPickUpPointsQueryProps = filters;
    const query = this.queryFactory.create('list', props);
    const result = await this.queryBus.execute(query);
    if (result.isError) {
      switch (result.constructor) {
        default:
          return HttpResponse.internalServerError(result.getError());
      }
    }
    return HttpResponse.ok(result.getValue());
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string): Promise<any> {
    const query = this.queryFactory.create('get', { uuid });
    const result = await this.queryBus.execute(query);

    if (result.isError) {
      switch (result.constructor.name) {
        case 'NotFoundError':
          return HttpResponse.notFound(result.getError());
        default:
          return HttpResponse.internalServerError(result.getError());
      }
    }
    return HttpResponse.ok(result.getValue());
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<any> {
    const query = this.commandFactory.create('delete', { uuid });
    const result = await this.cb.execute(query);

    if (result.isError) {
      switch (result.constructor.name) {
        case 'NotFoundError':
          return HttpResponse.notFound(result.getError());
        default:
          return HttpResponse.internalServerError(result.getError());
      }
    }
    return HttpResponse.ok(result.getValue());
  }
}
