import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm'
import Team from './Team'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  age: number
  
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}

export default User;
