import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, getManager, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(username: string, hashedPassword: string): Promise<User> {
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    username: string,
    password?: string,
  ): Promise<User> {
    const user = await this.findById(id);

    user.username = username;
    if (password) {
      user.password = password;
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async addFriend(userId: number, friendId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["friends"],
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });
    if (!friend) {
      throw new Error(`Friend with ID ${friendId} not found`);
    }

    user.friends = [...user.friends, friend];
    await this.userRepository.save(user);

    return {
      userId: user.id,
      username: user.username,
      friends: user.friends,
    };
  }

  async removeFriend(userId: number, friendId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["friends"],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const friendIndex = user.friends.findIndex((f) => f.id === +friendId);
    if (friendIndex === -1) {
      throw new Error(
        `Friend with ID ${friendId} is not in the friend list of user with ID ${userId}`,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.query(
        'DELETE FROM user_friends_user WHERE ("userId_1" = $1 AND "userId_2" = $2) OR ("userId_1" = $2 AND "userId_2" = $1)',
        [userId, friendId],
      );
    });
  }

  async findUserFriends(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["friends", "friends.deeds"],
    });

    if (!user) {
      throw new BadRequestException(`No user with id ${userId}`);
    }

    return user.friends.map((friend) => ({
      userId: friend.id,
      username: friend.username,
      deeds: friend.deeds,
    }));
  }
}
