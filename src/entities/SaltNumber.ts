import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import User from "./User"

@Entity('saltNumber')
class SaltNumber {
  @PrimaryColumn()
  user_id: number
  
  @Column()
  salt: string

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' })
  user: User
}

export default SaltNumber