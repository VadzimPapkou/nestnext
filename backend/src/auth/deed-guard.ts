import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { DeedsService } from '../deeds/deeds.service';

@Injectable()
export class DeedGuard implements CanActivate {
    constructor(private readonly deedsService: DeedsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const deedId = +request.params.id;

        if (user.isAdmin) {
            return true;
        }

        const deed = await this.deedsService.findById(deedId);

        if (deed && deed.user.id === user.userId) {
            return true;
        }

        throw new ForbiddenException('Вы не имеете права на выполнение этого действия.');
    }
}
