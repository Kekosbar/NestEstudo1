import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Project from "./Project";
import User from "./User";

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  closed: boolean
  
  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  leader_id: number

  @OneToMany(() => User, user => user.team)
  users: User[]

  @OneToOne(() => User)
  @JoinColumn({ name: 'leader_id' })
  leader: User

  @ManyToMany(() => Project)
  @JoinTable({ name: 'teams_projects' })
  projects: Project[]
  
  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date
  
}

export default Team;