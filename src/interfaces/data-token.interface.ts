import { Role } from "src/enum/role.enum";

export interface DataToken {
  sub: number,
  username: string,
  teamId: number,
  roles: Role[],
  create_at: Date
}
