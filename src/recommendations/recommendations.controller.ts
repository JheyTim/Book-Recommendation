// src/recommendations/recommendations.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyRecommendations(@Request() req) {
    const userId = req.user.userId;
    return this.recommendationsService.getRecommendationsForUser(userId);
  }
}
