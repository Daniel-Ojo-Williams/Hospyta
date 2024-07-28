import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthRequest } from '../users/interfaces/auth-interface';
import { AuthGuard } from '../../guard/auth.guard';
import { FindAllPostsQueryDto } from './dto/post-query.dto';
import { GetPostCommentsQueryDto } from './entities/get-post-comments-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: AuthRequest) {
    const user_id = req.user?.sub;
    await this.postsService.createPost(createPostDto, user_id);

    return {
      success: true,
      message: 'Post created successfully',
      status_code: HttpStatus.CREATED,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() queryDto: FindAllPostsQueryDto) {
    const [posts, total_count] = await this.postsService.findAll(queryDto);

    return {
      success: true,
      message: 'Fetched posts successfully',
      data: {
        posts,
        total_count,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.postsService.findOne(id);

    return {
      success: true,
      message: 'Fetcehed post successfully',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: AuthRequest,
  ) {
    const user_id = req.user?.sub;

    await this.postsService.updatePost(id, updatePostDto, user_id);

    return {
      success: true,
      message: 'Updated post successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Get(':post_id/comments')
  async getPostComments(
    @Param('post_id', ParseUUIDPipe) post_id: string,
    @Query() query?: GetPostCommentsQueryDto,
  ) {
    const data = await this.postsService.getPostcomments(
      post_id,
      query?.page,
      query?.limit,
    );

    return {
      success: true,
      message: 'Fetched comments successfully',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthRequest,
  ) {
    const user_id = req.user?.sub;
    await this.postsService.removePost(id, user_id);

    return {
      success: true,
      message: 'Deleted post successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id/up-vote')
  async upvotePost(@Param('id', ParseUUIDPipe) id: string) {
    await this.postsService.upVotePost(id);

    return {
      success: true,
      message: 'UpVoted post successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id/down-vote')
  async downvotePost(@Param('id', ParseUUIDPipe) id: string) {
    await this.postsService.downVotePost(id);

    return {
      success: true,
      message: 'DownVoted post successfully',
    };
  }
}
