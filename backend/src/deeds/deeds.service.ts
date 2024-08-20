import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deed } from "./deed.entity";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { DeedDto } from "./dto";

@Injectable()
export class DeedsService {
  constructor(
    @InjectRepository(Deed)
    private readonly deedsRepository: Repository<Deed>,
    private readonly usersService: UsersService,
  ) {}

  async createDeed(
    userId: number,
    title: string,
    description: string,
  ): Promise<DeedDto> {
    const user = await this.usersService.findById(userId);
    const deed = this.deedsRepository.create({ title, description, user });
    await this.deedsRepository.save(deed);
    return { title: deed.title, description: deed.description, id: deed.id };
  }

  async findAllByUser(userId: number): Promise<DeedDto[]> {
    const user = await this.usersService.findById(userId);
    return this.deedsRepository.find({
      where: { user },
      order: { id: "DESC" },
    });
  }

  async findById(id): Promise<Deed> {
    return this.deedsRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async updateDeed(
    deedId: number,
    title: string,
    description: string,
  ): Promise<DeedDto> {
    const deed = await this.deedsRepository.findOne({ where: { id: deedId } });
    if (!deed) throw new NotFoundException(`Deed with id ${deedId} not found`);
    deed.title = title;
    deed.description = description;
    return this.deedsRepository.save(deed);
  }

  async deleteDeed(deedId: number): Promise<void> {
    const deed = await this.deedsRepository.findOne({ where: { id: deedId } });

    if (!deed) {
      throw new NotFoundException(`Deed with ID ${deedId} not found`);
    }

    await this.deedsRepository.delete(deedId);
  }
}
