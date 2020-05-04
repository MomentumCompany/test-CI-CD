import { Body, Controller, Param, Post } from '@nestjs/common';
import { TokenService } from '../../services/token/token.service';

interface TokenCreateBody {
  token: string;
}

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {
  }

  @Post('add/:userId')
  generateToken(@Param('userId') userId: number, @Body() body: TokenCreateBody): Promise<any> {
    return this.tokenService.generateToken(userId, body.token);
  }
}
