import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Users } from '../users/entities/users';
import { CommentReply } from './entities/replies.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private comments: Repository<Comment>,
    @InjectRepository(CommentReply) private reply: Repository<CommentReply>,
  ) {}

  async addComment(createCommentDto: CreateCommentDto, user_id: string) {
    try {
      const comment = this.comments.create(createCommentDto);
      comment.post = { id: createCommentDto.post_id } as Post;
      comment.user = { id: user_id } as Users;
      return await this.comments.save(comment);
    } catch (error) {
      console.log(error);
    }
  }

  async lazyLoadingPostComments(
    post_id: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const [result, total] = await this.comments.findAndCount({
      where: { post: { id: post_id } },
      relations: {
        replies: {
          user: true,
        },
      },
      select: {
        replies: {
          reply: true,
          user: {
            display_pic: true,
            full_name: true,
            username: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      comments: result,
      total_comment: total,
    };
  }

  async replyComment(
    comment_id: string,
    user_id: string,
    createReplyDto: CreateReplyDto,
  ) {
    const reply = this.reply.create(createReplyDto);
    reply.comment = { id: comment_id } as Comment;
    reply.user = { id: user_id } as Users;

    await this.reply.save(reply);
  }
}
