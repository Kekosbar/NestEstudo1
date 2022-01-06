import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SAME_TEAM_KEY } from "src/decorators/sameTeam.decorator";
import { SameTeamGetId } from "src/enum/sameTeam.enum";
import { UserInterface } from "src/interfaces/user.interface";

@Injectable()
export class SameTeamGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const sameTeam = this.reflector.getAllAndOverride<SameTeamGetId[]>(SAME_TEAM_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!sameTeam) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    if(!user)
      return false;
    
    if(sameTeam.some((option) => option === SameTeamGetId.IN_PARAMS)){
      if(!this.checkIdInParams(context, user))
        return false;
    }
    
    return true;
  }

  private checkIdInParams(context: ExecutionContext, user: UserInterface) {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const id = params.id;
    return user.teamId == id
  }
}