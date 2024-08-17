import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Put,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "./user.entity";
import { UserGuard } from "../auth/user-guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body("username") username: string,
    @Body("password") password?: string,
  ): Promise<User> {
    return this.usersService.updateUser(id, username, password);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post(":id/friends")
  async addFriend(@Param("id") id: number, @Body("friendId") friendId: number) {
    return this.usersService.addFriend(id, friendId);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get(":id/friends")
  async getUserFriends(@Param("id") id: number) {
    return this.usersService.findUserFriends(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(":id/friends/:friendId")
  async deleteFriend(
    @Param("id") id: string,
    @Param("friendId") friendId: string,
  ) {
    await this.usersService.removeFriend(+id, +friendId);
  }
}
