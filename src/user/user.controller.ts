import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { Login, UserRegistrationModel } from '../shared-models/user.view-models';
import { User } from '../models/user.entity';


@Controller('Users')
export class UserController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('Login')
  Login(@Body() login: Login): Promise<string> {
    return this.usersService.getUserByEmail(login.email.trim()).then(user => {
      if (user.length > 0) {
        const currentUser = user[0];
        // console.log('going to check password');
        return this.usersService.CheckPassword(currentUser, login.password).then(value => {
          console.log(value);
          return value;
        });

      } else {
        // return {message: "Invalid Username "};
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid username',
        }, HttpStatus.FORBIDDEN);
      }
    });
  }

  @Post('Register')
  async Register(@Body() registerModel: UserRegistrationModel): Promise<User> {
    const response = await this.usersService.getUserByEmail(registerModel.email);
    if (response.length > 0) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email is already taken!',
      }, HttpStatus.UNAUTHORIZED);
    } else {
      return this.usersService.AddUser(registerModel, registerModel.subscriptionPlanId);

    }
  }
}
