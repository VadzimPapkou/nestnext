import { ApiProperty } from "@nestjs/swagger";

export class CreateDeedDto {
  @ApiProperty({
    example: "Make a coffee",
  })
  title: string;
  @ApiProperty({
    example: "*How to make a coffee*",
  })
  description: string;
}

export class DeedDto {
  @ApiProperty({
    example: "Make a coffee",
  })
  title: string;
  @ApiProperty({
    example: "*How to make a coffee*",
  })
  description: string;
  @ApiProperty({
    example: 3,
  })
  id: number;
}
