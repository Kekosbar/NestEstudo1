import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Team from "./Team";

@Entity('projects')
class Project {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // @ManyToMany(() => Team, team => team.projects, { cascade: true })
  // @JoinTable({ name: 'teams_projects' })
  // teams: Team[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Project;