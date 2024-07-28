import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Raw, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Category } from '../category/entities/category.entity';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';
import { FindAllPostsQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private posts: Repository<Post>,
    private users: UsersService,
    private comments: CommentsService,
  ) {}

  async createPost(createPostDto: CreatePostDto, user_id: string) {
    const post = this.posts.create(createPostDto);

    const user = await this.users.findUserByID(user_id); // --| This increases the calls to db, but ensures data validity

    if (!user)
      throw new HttpException(
        {
          success: false,
          message: 'User not found',
          status_code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    post.user = user;
    post.category = { id: createPostDto.category_id } as Category; // --| This optimises the process by just asserting the category but risks data validity

    await this.posts.save(post);
  }

  findAll(query: FindAllPostsQueryDto) {
    const date =
      query?.created_at &&
      new Date(query?.created_at).toISOString().split('T')[0];

    const page = query?.page || 1;
    const limit = query?.limit || 10;

    return this.posts.findAndCount({
      where: {
        ...(query?.created_at && {
          created_at: Raw((alias) => `DATE(${alias}) = :date`, {
            date,
          }),
        }),
        up_votes: query?.up_vote,
        category: {
          id: query?.category_id,
        },
      },
      relations: {
        category: true,
        user: true,
      },
      select: {
        user: {
          display_pic: true,
          full_name: true,
          username: true,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(
    id: string,
  ): Promise<{ post: Post; comments: Comment[]; total_comment: number }> {
    const post = await this.posts.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!post)
      throw new HttpException(
        {
          success: false,
          message: 'Post not found',
          status_code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    // --| Get post comments (Only the first 10)
    const comments = await this.comments.lazyLoadingPostComments(id);
    return {
      post,
      ...comments,
    };
  }

  async getPostcomments(post_id: string, page?: number, limit?: number) {
    const data = await this.comments.lazyLoadingPostComments(
      post_id,
      page,
      limit,
    );

    return data;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto, user_id: string) {
    const post = await this.posts.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!post)
      throw new HttpException(
        {
          success: false,
          message: 'Post not found',
          status_code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    if (post.user.id !== user_id)
      throw new HttpException(
        {
          success: false,
          message: 'Access denied',
          status_code: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );

    const atLeastOneField = Object.keys(updatePostDto).length !== 0;

    if (!atLeastOneField)
      throw new HttpException(
        {
          success: false,
          message: `Send fields to update`,
          status_code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );

    return this.posts.update(id, updatePostDto);
  }

  async removePost(id: string, user_id: string) {
    const post = await this.posts.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!post)
      throw new HttpException(
        {
          success: false,
          message: 'Post not found',
          status_code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    if (post.user.id !== user_id)
      throw new HttpException(
        {
          success: false,
          message: 'Access denied',
          status_code: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );

    await this.posts.delete({ id });
  }
}
