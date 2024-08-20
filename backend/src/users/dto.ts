import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: "newusername" })
  username: string;

  @ApiProperty({ example: "newpassword", required: false })
  password?: string;
}

export class AddFriendDto {
  @ApiProperty({ example: 2 })
  friendId: number;
}

export class DeleteFriendDto {
  @ApiProperty({ example: 2 })
  friendId: number;
}
