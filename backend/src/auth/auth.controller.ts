import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.register(username, password);
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(username, password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
