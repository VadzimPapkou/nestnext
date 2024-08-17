import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<any> {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    const user = await this.usersService.create(username, hashedPassword);

    const payload = { username: user.username, userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      userId: user.id,
      username: user.username,
      accessToken: accessToken,
      isAdmin: user.isAdmin,
    };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials(no username)");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials(wrong password)");
    }

    const payload = {
      username: user.username,
      userId: user.id,
      isAdmin: user.isAdmin,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      userId: user.id,
      username: user.username,
      accessToken: accessToken,
      isAdmin: user.isAdmin,
    };
  }
}
