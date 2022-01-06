import { SetMetadata } from '@nestjs/common';
import { SameTeamGetId } from 'src/enum/sameTeam.enum';

export const SAME_TEAM_KEY = 'sameTeam';
export const SameTeam = (...sameTeamGet: SameTeamGetId[]) => SetMetadata(SAME_TEAM_KEY, sameTeamGet);