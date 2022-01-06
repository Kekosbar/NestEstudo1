import { Role } from "src/enum/role.enum";

export interface Payload {
  sub: number,
  username: string,
  teamId: number,
  roles: Role[],
  create_at: Date
}