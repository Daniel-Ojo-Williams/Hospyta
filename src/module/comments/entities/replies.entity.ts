import { AbstractEntity } from '../../../shared/AbstractEntity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Users } from 'src/module/users/entities/users';
import { Comment } from './comment.entity';

@Entity()
export class CommentReply extends AbstractEntity {
  @Column()
  reply: string;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @ManyToOne(() => Users, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<Users>;
}
