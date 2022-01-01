import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  closed: boolean
  
  @Column({ nullable: false })
  name: string

  @OneToMany(() => User, user => user.team)
  users: User[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
  
}

export default Team;