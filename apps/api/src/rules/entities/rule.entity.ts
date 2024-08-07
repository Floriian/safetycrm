import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('rules_name', ['name'])
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Rule, (rule) => rule.children)
  parent: Rule;

  @OneToMany(() => Rule, (rule) => rule.parent)
  children: Rule[];

  @ManyToMany(() => Client)
  @JoinTable()
  clients: Client[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
