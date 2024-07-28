import { AbstractEntity } from '../../../shared/AbstractEntity';
import { BeforeInsert, Column, Entity, OneToMany, Relation } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { CommentReply } from 'src/module/comments/entities/replies.entity';

@Entity()
export class Users extends AbstractEntity {
  @Column({ nullable: false })
  full_name: string;

  @Column()
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  display_pic: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment[]>;

  @OneToMany(() => CommentReply, (reply) => reply.user)
  replies: Relation<CommentReply[]>;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
}
