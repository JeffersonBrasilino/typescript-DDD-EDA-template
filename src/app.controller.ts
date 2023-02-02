import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  getRoute() {
    return;
  }
}
