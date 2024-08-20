import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "test1",
  })
  username: string;
  @ApiProperty({
    example: "123",
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    example: "test1",
  })
  username: string;
  @ApiProperty({
    example: "123",
  })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example: 4,
  })
  userId: number;
  @ApiProperty({
    example: "test1",
  })
  username: string;
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJ1c2VySWQiOjEyMywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjEyOTk5OTAwLCJleHAiOjE2MTMwMDM1MDB9.HmYbLUOZMRpU5D7pRhwHXeTRhL_zAnOZ3-fYZMXY-UI",
  })
  accessToken: string;
  @ApiProperty({
    example: false,
  })
  isAdmin: boolean;
}
