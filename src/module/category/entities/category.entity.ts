import { AbstractEntity } from '../../../shared/AbstractEntity';
import { Column, Entity } from 'typeorm';

@Entity('post_category')
export class Category extends AbstractEntity {
  @Column()
  category: string;
}
