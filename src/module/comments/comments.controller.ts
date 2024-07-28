import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthRequest } from '../users/interfaces/auth-interface';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: AuthRequest) {
    const user_id = req.user?.sub;
    return this.commentsService.addComment(createCommentDto, user_id);
  }

  @UseGuards(AuthGuard)
  @Post(':comment_id/reply')
  async replyComment(
    @Param('comment_id', ParseUUIDPipe) comment_id: string,
    @Body() createReplyDto: CreateReplyDto,
    @Req() req: AuthRequest,
  ) {
    const user_id = req.user?.sub;
    await this.commentsService.replyComment(
      comment_id,
      user_id,
      createReplyDto,
    );

    return {
      success: true,
      message: 'Reply added successfully',
    };
  }
}
