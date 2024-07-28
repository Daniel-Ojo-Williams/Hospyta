import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => 'now()', type: 'timestamptz' })
  created_at: string;

  @Column({ default: () => 'now()', type: 'timestamptz', onUpdate: 'now()' })
  updated_at: string;
}
