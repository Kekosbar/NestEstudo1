import { Role } from "src/enum/role.enum";

export interface UserInterface {
  userId: number 
  username: string,
  teamId: number,
  roles: Role[],
  create_at: Date
}