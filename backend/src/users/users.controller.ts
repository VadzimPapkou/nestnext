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
import { UserGuard } from "./user-guard";
import { AdminGuard } from "./admin-guard";
import { ApiTags } from "@nestjs/swagger";
import { FriendDto, UpdateUserDto } from "./dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, body.username, body.password);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
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
  async getUserFriends(@Param("id") id: number): Promise<FriendDto[]> {
    return this.usersService.findUserFriends(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(":id/friends/:friendId")
  async deleteFriend(
    @Param("id") id: string,
    @Param("friendId") friendId: string,
  ) {
    return this.usersService.removeFriend(+id, +friendId);
  }
}
