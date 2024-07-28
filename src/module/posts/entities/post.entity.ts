import { Users } from '../../users/entities/users';
import { AbstractEntity } from '../../../shared/AbstractEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'integer', default: 0 })
  up_votes: number;

  @Column({ type: 'integer', default: 0 })
  down_votes: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Relation<Comment[]>;
}
