import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('rules_name', ['name'])
@Tree('materialized-path')
export class Rule {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @TreeParent({ onDelete: 'CASCADE' })
  @ApiProperty({ type: Rule })
  parent: Rule;

  @ApiProperty({ type: Rule })
  @TreeChildren()
  children: Rule[];

  @ManyToMany(() => Client)
  @JoinTable()
  clients: Client[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
