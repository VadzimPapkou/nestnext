import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import {DeedsService} from "../deeds/deeds.service";

@Injectable()
export class UserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userResourceId = +request.params.id;

        if (user.isAdmin) {
            return true;
        }

        if (user.userId === userResourceId) {
            return true;
        }

        throw new ForbiddenException('You do not have permission to perform this action.');
    }
}
