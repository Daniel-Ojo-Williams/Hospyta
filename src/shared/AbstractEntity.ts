import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'now' })
  created_at: Date;

  @Column({ default: 'now()' })
  updated_at: Date;
}
