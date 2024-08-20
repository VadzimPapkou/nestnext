import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthResponseDto, LoginDto, RegisterDto } from "./dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body.username, body.password);
  }

  @Post("login")
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  async getProfile(@Request() req) {
    return req.user;
  }
}
