import { Role } from "src/resources/auth/roles/role.enum";

export interface DataToken {
  sub: number,
  roles: Role[],
  create_at: Date
}
