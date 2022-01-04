import { Role } from "src/roles/role.enum";

export interface DataToken {
  sub: number,
  roles: Role[],
  create_at: Date
}
