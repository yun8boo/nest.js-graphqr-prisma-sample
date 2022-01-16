import { Module } from '@nestjs/common';
import { CurrentUserController } from './current-user.controller';

@Module({
  controllers: [CurrentUserController],
})
export class CurrentUserModule {}
