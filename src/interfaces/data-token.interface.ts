import { Role } from "src/enum/role.enum";

export interface DataToken {
  sub: number,
  roles: Role[],
  create_at: Date
}
