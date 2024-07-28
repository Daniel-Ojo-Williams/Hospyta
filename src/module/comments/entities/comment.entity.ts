import { Post } from '../../posts/entities/post.entity';
import { AbstractEntity } from '../../../shared/AbstractEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Users } from 'src/module/users/entities/users';
import { CommentReply } from './replies.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column()
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToMany(() => CommentReply, (reply) => reply.comment)
  replies: Relation<CommentReply[]>;

  @ManyToOne(() => Users, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<Users>;
}
