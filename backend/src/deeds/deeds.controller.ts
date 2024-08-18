import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import { DeedsService } from "./deeds.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetUser } from "../auth/get-user.decorator";
import { DeedGuard } from "./deed-guard";

@Controller("deeds")
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDeed(
    @GetUser() user,
    @Body("title") title: string,
    @Body("description") description: string,
  ) {
    return this.deedsService.createDeed(user.userId, title, description);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserDeeds(@Query("userId") id: number) {
    return this.deedsService.findAllByUser(id);
  }

  @UseGuards(JwtAuthGuard, DeedGuard)
  @Put(":id")
  async updateDeed(
    @Param("id") id: number,
    @Body("title") title: string,
    @Body("description") description: string,
  ) {
    return this.deedsService.updateDeed(id, title, description);
  }

  @UseGuards(JwtAuthGuard, DeedGuard)
  @Delete(":id")
  async deleteDeed(@Param("id") id: number) {
    return this.deedsService.deleteDeed(id);
  }
}
