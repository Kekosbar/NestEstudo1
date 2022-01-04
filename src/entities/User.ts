import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import Role from './Role'
import Team from './Team'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ nullable: false })
  email: string
  
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, select: false, default: '' })
  password: string
  
  @Column()
  team_id: number

  @ManyToOne(() => Team, team => team.users)
  @JoinColumn({ name: 'team_id' })
  team: Team

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}

export default User;
