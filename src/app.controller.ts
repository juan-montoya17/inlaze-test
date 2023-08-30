import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayWelcome(): string {
    return this.appService.getWelcome();
  }

  @Get('status')
  getStatus(): { status: string } {
    return this.appService.getStatus();
  }
}
