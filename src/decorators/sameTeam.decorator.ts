import { SetMetadata } from '@nestjs/common';

export const SAME_TEAM_KEY = 'sameTeam';
export const SameTeam = () => SetMetadata(SAME_TEAM_KEY, true);