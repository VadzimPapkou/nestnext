import { Module } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Deed} from "./deed.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Deed]), UsersModule],
  providers: [DeedsService],
  controllers: [DeedsController],
  exports: [DeedsService]
})
export class DeedsModule {}
